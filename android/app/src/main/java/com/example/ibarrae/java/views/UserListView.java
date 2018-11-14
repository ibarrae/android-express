package com.example.ibarrae.java.views;

import com.example.ibarrae.java.dto.UserResponseDto;

import java.util.List;

public interface UserListView {

    void loadUserRecyclerView(List<UserResponseDto> users);
}
