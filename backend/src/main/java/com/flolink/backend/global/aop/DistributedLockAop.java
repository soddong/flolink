package com.flolink.backend.global.aop;

import java.lang.reflect.Method;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.redisson.api.RLock;
import org.redisson.api.RedissonClient;
import org.springframework.context.expression.MethodBasedEvaluationContext;
import org.springframework.core.DefaultParameterNameDiscoverer;
import org.springframework.dao.CannotAcquireLockException;
import org.springframework.expression.EvaluationContext;
import org.springframework.expression.ExpressionParser;
import org.springframework.expression.spel.standard.SpelExpressionParser;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Aspect
@Component
@RequiredArgsConstructor
@Slf4j
public class DistributedLockAop {

	private static final String REDISSON_LOCK_PREFIX = "LOCK:";
	private final RedissonClient redissonClient;
	private final ExpressionParser parser = new SpelExpressionParser();

	@Around("@annotation(com.flolink.backend.global.aop.DistributedLock)")
	public Object lock(ProceedingJoinPoint joinPoint) throws Throwable {
		log.info("lock method start");
		MethodSignature signature = (MethodSignature) joinPoint.getSignature();
		Method method = signature.getMethod();
		DistributedLock distributedLock = method.getAnnotation(DistributedLock.class);

		String spelKey = distributedLock.key();
		String key = REDISSON_LOCK_PREFIX + evaluateKey(spelKey, joinPoint);
		RLock rLock = redissonClient.getLock(key);
		log.info(spelKey);

		boolean lockAcquired = false;
		try {
			lockAcquired = rLock.tryLock(distributedLock.waitTime(), distributedLock.leaseTime(), distributedLock.timeUnit());
			log.info("lock 획득 유무 {} ", lockAcquired);
			if (!lockAcquired) {
				throw new CannotAcquireLockException("Failed to acquire lock for key: " + key);
			}

			return joinPoint.proceed();
		} finally {
			if (lockAcquired && rLock.isHeldByCurrentThread()) {
				rLock.unlock();
			}
		}
	}

	private String evaluateKey(String spelKey, ProceedingJoinPoint joinPoint) {
		MethodSignature signature = (MethodSignature) joinPoint.getSignature();
		EvaluationContext context = new MethodBasedEvaluationContext(
			joinPoint.getTarget(),
			signature.getMethod(),
			joinPoint.getArgs(),
			new DefaultParameterNameDiscoverer()
		);
		return parser.parseExpression(spelKey).getValue(context, String.class);
	}
}
