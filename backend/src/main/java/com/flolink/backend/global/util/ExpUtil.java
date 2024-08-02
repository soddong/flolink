package com.flolink.backend.global.util;

import com.flolink.backend.global.common.GlobalConstant;

public class ExpUtil {
	public static int calculateLevel(int exp, int memberSize) {
		int level = (exp / (GlobalConstant.LEVEL_EXP_BASE_UNIT
			* memberSize)) + 1;
		return Math.min(level, 4);
	}
}
