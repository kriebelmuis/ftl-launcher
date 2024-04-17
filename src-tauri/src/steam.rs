use anyhow::anyhow;
use steamworks::{ Client, FriendFlags, Friend, AppId };

const DAYZ_APPID: AppId = AppId(221100);

pub fn verify_dayz_copy(client: Client) -> Result<(), anyhow::Error> {
    // retrieve information about installed applications
    let apps = client.apps();

    // check if DayZ is installed and subscribed
    let installed = apps.is_app_installed(DAYZ_APPID);
    let subscribed = apps.is_subscribed_app(DAYZ_APPID);

    // verify DayZ installation and subscription status
	if installed && subscribed {
		Ok(())
	} else {
		Err(anyhow!("DayZ is either not installed or not subscribed"))
	}	
}

pub fn get_dayz_friends_dayz(client: Client) -> Vec<Friend<steamworks::ClientManager>> {
	// retrieve the list of friends currently on playing dayz
    client
        .friends()
        .get_friends(FriendFlags::ON_GAME_SERVER)
        .into_iter()
        .filter(|friend| friend.game_played().map_or(false, |game| game.game.app_id() == DAYZ_APPID))
        .collect()
}
