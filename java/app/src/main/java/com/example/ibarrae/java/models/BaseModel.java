package com.example.ibarrae.java.models;

public abstract class BaseModel<V> {

    protected V view;

    public BaseModel(V view) {
        this.view = view;
    }
}
