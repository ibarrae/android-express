package com.example.ibarrae.java.utils;

import android.app.Activity;
import android.widget.Toast;

public class ToastUtils {

    public static void longDuration(Activity activity, String message) {
        Toast.makeText(activity, message, Toast.LENGTH_LONG).show();
    }
}
