// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

#[macro_use]
extern crate lazy_static;
use steamworks::Client;
use anyhow::Context;

mod steam;

fn main() {
    app_lib::run();

	// tests
	let (client, sclient) = Client::init().context("Failed to initialize Steam client");
	steam::verify_dayz_copy(client);
	steam::get_dayz_friends_dayz(client);
}
