const typDefs = require('./schema');

module.exports = {
    Query: {
        launches: (_, __, { dataSources }) => dataSources.launchAPI.getAllLaunches(),
        launch: (_, { id }, { dataSources }) => dataSources.launchAPI.getLaunchById({ launchId: id }),
        me: (_, __, { dataSources }) => dataSources.userAPI.findOrCreateUser()
    },

    Mission: {
        // Default size is LARGE if not provided
        missionPatch: (mission, { size } = { size: 'LARGE' }) => {
            return size === 'SMALL' ? mission.missionPatchSmall : mission.missionPatchLarge;
        }
    },

    Launch: {
        isBooked: async (launch, _, { dataSources }) =>
            dataSources.userAPI.isBookedOnLaunch({ launchId: launch.id }),
    },

    User: {
        trips: async (_, __, { dataSources }) => {
            const launchIds = await dataSources.userAPI.getLaunchIdsByUser();

            if (!launchIds.length) return [];

            return (
                dataSources.launchAPI.getLaunchesByIds({ launchIds }) || []
            );
        }
    }
}