package com.example.ibarrae.java.adapters;

import android.content.Context;
import android.support.annotation.NonNull;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.example.ibarrae.java.R;
import com.example.ibarrae.java.dto.UserResponseDto;

import java.util.List;

import butterknife.BindView;
import butterknife.ButterKnife;

public class UserAdapter extends RecyclerView.Adapter<UserAdapter.UserHolder> {

    private Context context;
    private List<UserResponseDto> users;

    public UserAdapter(Context context, List<UserResponseDto> users) {
        this.context = context;
        this.users = users;
    }

    @NonNull
    @Override
    public UserHolder onCreateViewHolder(@NonNull ViewGroup parent, int i) {
        View view = LayoutInflater.from(context).inflate(R.layout.layout_user_item, parent, false);
        return new UserHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull UserHolder userHolder, int position) {
        UserResponseDto userDto = users.get(position);
        userHolder.tvUsername.setText(userDto.getUsername());
        userHolder.tvCompleteName.setText(userDto.getName());
    }

    @Override
    public int getItemCount() {
        return users.size();
    }

    public class UserHolder extends RecyclerView.ViewHolder {

        @BindView(R.id.tvUsername)
        public TextView tvUsername;
        @BindView(R.id.tvCompleteName)
        public TextView tvCompleteName;

        public UserHolder(View view) {
            super(view);
            ButterKnife.bind(this, view);
        }
    }
}
