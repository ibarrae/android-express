package com.example.ibarrae.java;

import android.support.test.espresso.Espresso;
import android.support.test.espresso.IdlingRegistry;
import android.support.test.espresso.IdlingResource;
import android.support.test.espresso.action.ViewActions;
import android.support.test.espresso.assertion.ViewAssertions;
import android.support.test.espresso.intent.Intents;
import android.support.test.rule.ActivityTestRule;
import android.support.test.runner.AndroidJUnit4;

import com.example.ibarrae.java.activities.LoginActivity;
import com.example.ibarrae.java.activities.UserListActivity;
import com.example.ibarrae.java.helpers.MockResponse;
import com.example.ibarrae.java.helpers.TransitionWatcher;
import com.example.ibarrae.java.utils.Constants;
import com.example.ibarrae.java.utils.EspressoIdleHandler;
import com.squareup.okhttp.mockwebserver.MockWebServer;

import org.junit.After;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;

import java.io.IOException;

import static android.support.test.espresso.intent.Intents.intended;
import static android.support.test.espresso.intent.matcher.IntentMatchers.hasComponent;
import static android.support.test.espresso.matcher.RootMatchers.withDecorView;
import static android.support.test.espresso.matcher.ViewMatchers.hasFocus;
import static android.support.test.espresso.matcher.ViewMatchers.isDisplayed;
import static android.support.test.espresso.matcher.ViewMatchers.withId;
import static android.support.test.espresso.matcher.ViewMatchers.withText;
import static org.hamcrest.CoreMatchers.not;
import static org.hamcrest.core.Is.is;

@RunWith(AndroidJUnit4.class)
public class LoginActivityTest {

    @Rule
    public ActivityTestRule<LoginActivity> rule = new ActivityTestRule<>(LoginActivity.class);
    private MockWebServer server;

    @Before
    public void init() throws IOException {
        Intents.init();
        server = new MockWebServer();
        server.start();
        Constants.endpointUrl = server.url("/").toString();
    }

    @After
    public void tearDown() {
        Intents.release();
        try {
            server.shutdown();
        } catch (IOException ex) {
        }
    }

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

    @Test
    public void unknownErrorShown() {
        IdlingResource resource = EspressoIdleHandler.getCountingResource();
        IdlingRegistry.getInstance().register(resource);
        Espresso.onView(withId(R.id.etUsername)).perform(ViewActions.typeText("blah"));
        Espresso.closeSoftKeyboard();
        Espresso.onView(withId(R.id.etPassword)).perform(ViewActions.typeText("blah"));
        Espresso.closeSoftKeyboard();
        Espresso.onView(withId(R.id.btnLogin)).perform(ViewActions.click());
        IdlingRegistry.getInstance().unregister(resource);
        Espresso.onView(withText(R.string.error_login))
                .inRoot(withDecorView(not(is(rule.getActivity().getWindow().getDecorView()))))
                .check(ViewAssertions.matches(isDisplayed()));
    }

    @Test
    public void navigateToUserListActivity() {
        server.enqueue(new com.squareup.okhttp.mockwebserver.MockResponse()
                .setResponseCode(Constants.OK)
                .setBody(MockResponse.login()));
        Constants.endpointUrl = server.url("/").toString();
        TransitionWatcher watcher = new TransitionWatcher();
        IdlingRegistry.getInstance().register(watcher);
        Espresso.onView(withId(R.id.etUsername))
                .perform(ViewActions.typeText("blah"));
        Espresso.closeSoftKeyboard();
        Espresso.onView(withId(R.id.etPassword))
                .perform(ViewActions.typeText("blah"));
        Espresso.closeSoftKeyboard();
        Espresso.onView(withId(R.id.btnLogin)).perform(ViewActions.click());
        IdlingRegistry.getInstance().unregister(watcher);
        intended(hasComponent(UserListActivity.class.getName()));
    }

    @Test
    public void invalidCredentialsShown() {
        IdlingResource resource = EspressoIdleHandler.getCountingResource();
        IdlingRegistry.getInstance().register(resource);
        server.enqueue(new com.squareup.okhttp.mockwebserver.MockResponse().setResponseCode(Constants.UNAUTHORIZED));
        Constants.endpointUrl = server.url("/").toString();
        Espresso.onView(withId(R.id.etUsername))
                .perform(ViewActions.typeText("asd"));
        Espresso.closeSoftKeyboard();
        Espresso.onView(withId(R.id.etPassword))
                .perform(ViewActions.typeText("asd"));
        Espresso.closeSoftKeyboard();
        Espresso.onView(withId(R.id.btnLogin)).perform(ViewActions.click());
        IdlingRegistry.getInstance().unregister(resource);
        Espresso.onView(withText(R.string.error_invalid_credentials))
                .inRoot(withDecorView(not(is(rule.getActivity().getWindow().getDecorView()))))
                .check(ViewAssertions.matches(isDisplayed()));
    }
}
