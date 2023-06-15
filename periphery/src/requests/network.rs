use async_trait::async_trait;
use monitor_types::entities::update::Log;
use resolver_api::{derive::Request, Resolve};
use serde::{Deserialize, Serialize};

use crate::{state::State, helpers::docker};

//

#[derive(Serialize, Deserialize, Debug, Clone, Request)]
#[response(Log)]
pub struct CreateNetwork {
	pub name: String,
	pub driver: Option<String>,
}

#[async_trait]
impl Resolve<CreateNetwork> for State {
	async fn resolve(&self, CreateNetwork { name, driver }: CreateNetwork) -> anyhow::Result<Log> {
		Ok(docker::create_network(&name, driver).await)
	}
}

//

#[derive(Serialize, Deserialize, Debug, Clone, Request)]
#[response(Log)]
pub struct DeleteNetwork {
	pub name: String,
}

#[async_trait]
impl Resolve<DeleteNetwork> for State {
	async fn resolve(&self, DeleteNetwork { name }: DeleteNetwork) -> anyhow::Result<Log> {
		Ok(docker::delete_network(&name).await)
	}
}

//

#[derive(Serialize, Deserialize, Debug, Clone, Request)]
#[response(Log)]
pub struct PruneNetworks {}

#[async_trait]
impl Resolve<PruneNetworks> for State {
	async fn resolve(&self, _: PruneNetworks) -> anyhow::Result<Log> {
		Ok(docker::prune_networks().await)
	}
}
