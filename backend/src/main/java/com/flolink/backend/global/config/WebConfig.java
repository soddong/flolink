// package com.flolink.backend.global.config;
//
// import org.springframework.context.annotation.Configuration;
// import org.springframework.web.servlet.config.annotation.CorsRegistry;
// import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
// import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
//
// @Configuration
// public class WebConfig implements WebMvcConfigurer {
//
//     @Override
//     public void addCorsMappings(CorsRegistry corsRegistry) {
//
//         corsRegistry.addMapping("/**")
//                 .allowedOrigins("http://localhost:3000");
//     }
//
//
//
//
//
// //    @Override
// //    public void addInterceptors(InterceptorRegistry registry) {
// //        registry.addInterceptor(jwtInterceptor).addPathPatterns("/**").excludePathPatterns("/api-user/user/login", "/resources/**",
// //                "/swagger-ui/**", "/v3/api-docs/**", "/api-user/user/refresh"); // 이건 통과 나머지는 안돼!
// //    }
//
// }
