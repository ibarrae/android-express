package com.example.ibarrae.java.models;

import com.example.ibarrae.java.api.RetrofitClient;
import com.example.ibarrae.java.api.users.UserAPI;
import com.example.ibarrae.java.api.users.UserListCallBack;
import com.example.ibarrae.java.dto.UserResponseDto;
import com.example.ibarrae.java.utils.Constants;
import com.example.ibarrae.java.utils.EspressoIdleHandler;
import com.example.ibarrae.java.utils.HeaderUtils;
import com.example.ibarrae.java.views.UserListView;
import com.pixplicity.easyprefs.library.Prefs;

import java.util.List;

import retrofit2.Call;

public class UserListModel extends BaseModel<UserListView> {

    public UserListModel(UserListView view) {
        this.view = view;
    }

    public void getUsers() {
        UserAPI userApi = new RetrofitClient().getService(UserAPI.class);
        UserListCallBack userListCallBack = new UserListCallBack(this.view);
        String token = Prefs.getString(Constants.TOKEN_KEY, "");
        Call<List<UserResponseDto>> getUsersCall = userApi
                .getUsers(HeaderUtils.createBearerAuthorizationHeader(token));
        EspressoIdleHandler.increment();
        getUsersCall.enqueue(userListCallBack);
    }
}
