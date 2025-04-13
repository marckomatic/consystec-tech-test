package com.notecs.dto;

import java.sql.Date;

public class TaskResponse {

    private Long id;
    private String title;
    private String content;
    private Date date;
    private Long userId;
    private boolean completed;

    public TaskResponse() {
    }


    public TaskResponse(Long id, String title, String content, Date date, Long userId) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.date = date;
        this.userId = userId;
    }

    // Getters y Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }


	public boolean isCompleted() {
		return completed;
	}


	public void setCompleted(boolean completed) {
		this.completed = completed;
	}
}