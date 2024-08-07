package com.flolink.backend.global.util;

import com.flolink.backend.global.common.GlobalConstant;

public class ExpUtil {
	public static int calculateLevel(int exp, int memberSize) {
		int level = (exp / (GlobalConstant.LEVEL_EXP_BASE_UNIT
			* memberSize)) + 1;
		return Math.min(level, 4);
	}

	/**
	 * 프론트에 시각적으로 경험치 비율을 보여주기 위해
	 * 총경험치 100대비 현재 경험치를 계산
	 * @param exp
	 * @param memberSize
	 * @return
	 */
	public static int calculateDisplayNowExp(int exp, int memberSize) {
		return (exp % (GlobalConstant.LEVEL_EXP_BASE_UNIT * memberSize)) / (4 * memberSize);
	}
}
