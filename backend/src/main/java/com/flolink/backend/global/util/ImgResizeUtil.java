package com.flolink.backend.global.util;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

import net.coobird.thumbnailator.Thumbnails;

public class ImgResizeUtil {

	public static ByteArrayInputStream resize(MultipartFile multipartFile) throws IOException {
		ByteArrayOutputStream os = new ByteArrayOutputStream();

		Thumbnails.of(multipartFile.getInputStream())
			.size(960, 540)
			.outputQuality(1)
			.keepAspectRatio(true)
			.toOutputStream(os);
		return new ByteArrayInputStream(os.toByteArray());

	}
}
