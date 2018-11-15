package com.example.ibarrae.java.helpers;

import android.app.Activity;
import android.support.test.InstrumentationRegistry;
import android.support.test.espresso.IdlingResource;

import com.example.ibarrae.java.activities.UserListActivity;

public class TransitionWatcher implements IdlingResource {

    private ResourceCallback callback;
    private Boolean isIdle = Boolean.TRUE;

    @Override
    public String getName() {
        return "Waiting for transition to happen.";
    }

    @Override
    public boolean isIdleNow() {
        if (isIdle) return true;
        Activity activity = getCurrentActivity();
        if (activity == null) return false;
        isIdle = activity instanceof UserListActivity;
        if (isIdle) callback.onTransitionToIdle();
        return isIdle;
    }

    public Activity getCurrentActivity() {
        return ((TestApplication) InstrumentationRegistry.getTargetContext().getApplicationContext()).getCurrentActivity();
    }

    @Override
    public void registerIdleTransitionCallback(ResourceCallback callback) {
        this.callback = callback;
    }
}
