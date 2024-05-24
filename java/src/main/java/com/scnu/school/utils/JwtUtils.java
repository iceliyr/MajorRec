package com.scnu.school.utils;

import io.jsonwebtoken.*;

import java.util.Date;

public class JwtUtils {

    private static final String SECRET_KEY = "schoolpre";
    private static final long expirationTimeMillis=24 * 60 * 60 * 1000;
    public static String generateJwt(String subject) {
        long nowMillis = System.currentTimeMillis();
        Date now = new Date(nowMillis);

        JwtBuilder builder = Jwts.builder()
                .setSubject(subject)
                .setIssuedAt(now)
                .signWith(SignatureAlgorithm.HS512, SECRET_KEY);

        if (expirationTimeMillis > 0) {
            long expMillis = nowMillis + expirationTimeMillis;
            Date expirationDate = new Date(expMillis);
            builder.setExpiration(expirationDate);
        }

        return builder.compact();
    }

    public static String parseJwt(String jwt) throws SignatureException {
        Claims claims = Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(jwt)
                .getBody();

        return claims.getSubject();
    }
}
