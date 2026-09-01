package com.pminternship.backend.dto;

public class InterviewQuestionDTO {

    private String category;
    private String question;
    private String difficulty;
    private String tip;
    private String expectedAnswer;

    public InterviewQuestionDTO() {
    }

    public InterviewQuestionDTO(
            String category,
            String question,
            String difficulty,
            String tip,
            String expectedAnswer) {

        this.category = category;
        this.question = question;
        this.difficulty = difficulty;
        this.tip = tip;
        this.expectedAnswer = expectedAnswer;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(String difficulty) {
        this.difficulty = difficulty;
    }

    public String getTip() {
        return tip;
    }

    public void setTip(String tip) {
        this.tip = tip;
    }

    public String getExpectedAnswer() {
        return expectedAnswer;
    }

    public void setExpectedAnswer(String expectedAnswer) {
        this.expectedAnswer = expectedAnswer;
    }
}