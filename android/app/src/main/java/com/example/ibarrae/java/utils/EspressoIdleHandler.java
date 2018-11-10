package com.example.ibarrae.java.utils;

import android.support.test.espresso.idling.CountingIdlingResource;

public class EspressoIdleHandler {

    private static final String RESOURCE = "TEST";

    private static CountingIdlingResource countingResource = new CountingIdlingResource(RESOURCE);

    public static void increment() {
        countingResource.increment();
    }

    public static void decrement() {
        countingResource.decrement();
    }

    public static CountingIdlingResource getCountingResource() {
        return countingResource;
    }
}
