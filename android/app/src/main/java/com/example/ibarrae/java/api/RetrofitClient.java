package com.example.ibarrae.java.api;

import com.example.ibarrae.java.converters.NullOnEmptyConverterFactory;
import com.example.ibarrae.java.utils.Constants;

import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class RetrofitClient {

    private Retrofit client;

    public RetrofitClient() {
        this.client = new Retrofit
                .Builder()
                .baseUrl(Constants.endpointUrl)
                .addConverterFactory(new NullOnEmptyConverterFactory())
                .addConverterFactory(GsonConverterFactory.create()).build();
    }

    public <S> S getService(Class<S> service) {
        return this.client.create(service);
    }

}
