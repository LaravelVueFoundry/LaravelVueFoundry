<?php

declare(strict_types=1);

return [
    'title' => 'Welcome, :name!',
    'meta.title' => 'Dashboard',
    'meta.description' => 'Your personal dashboard.',
    'edit' => [
        'title' => 'Edit Profile',
        'meta.title' => 'Edit your profile',
        'meta.description' => 'Edit your user profile.',
    ],
    'info' => [
        'title' => 'Profile Information',
        'intro' => "Update your account's profile information and email address.",
        'field.name' => 'Full Name',
        'field.name.placeholder' => 'John Doe',
        'field.email' => 'Email',
        'field.email.placeholder' => 'info@example.com',
        'email.unverified' => 'Your email address is unverified.',
        'email.verify-resend' => 'Click here to re-send the verification email.',
        'email.verify-sent' => 'A new verification link has been sent to your email address.',
        'submit' => 'Update',
        'submit.success' => 'Your profile information has been updated.',
    ],
    'update-pass' => [
        'title' => 'Update Password',
        'intro' => 'Ensure your account is using a long, random password to stay secure.',
        'field.pass-current' => 'Current Password',
        'field.pass-current.placeholder' => '',
        'field.pass-new' => 'New Password',
        'field.pass-new.placeholder' => '',
        'field.pass-confirm' => 'Confirm Password',
        'field.pass-confirm.placeholder' => '',
        'submit' => 'Update',
        'submit.success' => 'Your password has been updated.',
    ],
    'update-avatar' => [
        'title' => 'Update Profile Picture',
        'field.new-image.label' => 'New Image',
        'field.new-image.btn' => 'Choose a file',
        'field.new-image.nofile' => 'No file selected',
        'delete' => 'Delete avatar',
        'delete.success' => 'Your profile picture has been deleted.',
        'delete.modal' => [
            'heading' => 'Delete your avatar?',
            'intro' => 'Are you sure you want to delete your avatar?',
            'cancel' => 'Cancel',
            'submit' => 'Delete avatar',
        ],
        'submit' => 'Update',
        'submit.success' => 'Your profile picture has been updated.',
    ],
    'delete' => [
        'title' => 'Delete Account',
        'intro' => 'Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting your account, please download any data or information that you wish to retain.',
        'modal' => [
            'button' => 'Delete Account',
            'heading' => 'Delete your account?',
            'title' => 'Are you sure you want to delete your account?',
            'intro' => 'Once your account is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your account.',
            'field.password' => 'Password',
            'field.password.placeholder' => '',
            'cancel' => 'Cancel',
            'submit' => 'Delete Account',
        ],
    ],
];
