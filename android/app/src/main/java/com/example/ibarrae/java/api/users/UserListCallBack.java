package com.example.ibarrae.java.api.users;

import com.example.ibarrae.java.api.BaseCallback;
import com.example.ibarrae.java.dto.UserResponseDto;
import com.example.ibarrae.java.utils.Constants;
import com.example.ibarrae.java.views.UserListView;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class UserListCallBack extends BaseCallback<UserListView> implements Callback<List<UserResponseDto>> {

    public UserListCallBack(UserListView view) {
        this.view = view;
    }

    @Override
    public void onResponse(Call<List<UserResponseDto>> call, Response<List<UserResponseDto>> response) {
        Integer status = response.code();
        if (Constants.OK.equals(status)) {
            this.view.loadUserRecyclerView(response.body());
        }
    }

    @Override
    public void onFailure(Call<List<UserResponseDto>> call, Throwable t) {

    }
}
