package com.flolink.backend.global.util;

import java.io.InputStream;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

@Component
@RequiredArgsConstructor
public class S3Util {

	private final S3Client s3Client;

	@Value("${aws.s3.bucket}")
	private String bucketName;

	public void uploadImg(String keyName, InputStream inputStream, long contentLength) {
		PutObjectRequest putObjectRequest = PutObjectRequest.builder()
			.bucket(bucketName)
			.key(keyName)
			.build();
		s3Client.putObject(putObjectRequest, RequestBody.fromInputStream(inputStream, contentLength));
	}

	public void deleteImg(String keyName) {
		DeleteObjectRequest deleteObjectRequest = DeleteObjectRequest.builder()
			.bucket(bucketName)
			.key(keyName)
			.build();
		s3Client.deleteObject(deleteObjectRequest);
	}

}
