package com.example.ibarrae.java.utils;

import android.widget.EditText;

public class ViewUtils {

    public static void showEditTextError(EditText editText, String error) {
        editText.setError(error);
        editText.requestFocus();
    }

    public static String getText(EditText editText) {
        return editText.getText().toString();
    }
}
