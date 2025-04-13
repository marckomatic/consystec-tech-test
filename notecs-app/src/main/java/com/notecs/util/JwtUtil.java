package com.notecs.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import org.springframework.stereotype.Component;
import com.notecs.entity.User;

@Component
public class JwtUtil {

    private static final String SECRET_STRING = "dXbrH1TGw8q6SxqAj+ovKQ3FgVhz/VPSb7+5x1kR+0c=";
    private final Key SECRET_KEY = Keys.hmacShaKeyFor(Base64.getDecoder().decode(SECRET_STRING));

    private final long TOKEN_VALIDITY = 10 * 60 * 60 * 1000;

    public String generateToken(User user) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("id", user.getId());
        claims.put("name", user.getName());
        claims.put("email", user.getEmail());
        
        return Jwts.builder()
                .setClaims(claims)                      
                .setSubject(user.getEmail())             
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + TOKEN_VALIDITY))
                .signWith(SECRET_KEY, SignatureAlgorithm.HS256)
                .compact();
    }
    
    // Extrae el subject (en este caso, el email) del token
    public String extractUsername(String token) {
        return getClaims(token).getSubject();
    }

    public boolean validateToken(String token, String username) {
        String tokenUsername = extractUsername(token);
        return tokenUsername.equals(username) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        return getClaims(token).getExpiration().before(new Date());
    }

    private Claims getClaims(String token) {
        return Jwts.parserBuilder()
                   .setSigningKey(SECRET_KEY)
                   .build()
                   .parseClaimsJws(token)
                   .getBody();
    }
}
