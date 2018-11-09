package com.example.ibarrae.java.models.api.callback;

public abstract class BaseCallback<V> {
    protected V view;

    public BaseCallback(V view){
        this.view = view;
    }
}
