package com.example.ibarrae.java;

import android.support.test.espresso.Espresso;
import android.support.test.espresso.action.ViewActions;
import android.support.test.espresso.assertion.ViewAssertions;
import android.support.test.filters.LargeTest;
import android.support.test.rule.ActivityTestRule;
import android.support.test.runner.AndroidJUnit4;

import com.example.ibarrae.java.activities.LoginActivity;

import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;

import static android.support.test.espresso.matcher.ViewMatchers.hasFocus;
import static android.support.test.espresso.matcher.ViewMatchers.withId;

@RunWith(AndroidJUnit4.class)
@LargeTest
public class LoginActivityTest {
    @Rule
    public ActivityTestRule<LoginActivity> rule = new ActivityTestRule<>(LoginActivity.class);

    @Test
    public void focusUsernameWhenMissing() {
        Espresso.onView(withId(R.id.btnLogin)).perform(ViewActions.click());
        Espresso.onView(withId(R.id.etUsername)).check(ViewAssertions.matches(hasFocus()));
    }

    @Test
    public void focusPasswordWhenMissing() {
        Espresso.onView(withId(R.id.etUsername)).perform(ViewActions.typeText("blah"));
        Espresso.closeSoftKeyboard();
        Espresso.onView(withId(R.id.btnLogin)).perform(ViewActions.click());
        Espresso.onView(withId(R.id.etPassword)).check(ViewAssertions.matches(hasFocus()));
    }
}
