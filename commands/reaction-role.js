const Discord = require("discord.js");
const roleEmbed = new Discord.MessageEmbed();
/**
 * This function will allow users to react to get a role
 */
module.exports = {
  name: "reaction-role",
  aliases: ["react"],
  description: "Send message that allows users to react to get a role.",
  args: false,
  readOnly: false,
  channels: ["roles"],
  guildOnly: true,
  cooldown: 3,
  permLevel: 10,
  /**
   *
   * @param {message Object} message the message Object that was sent to trigger this command
   * @param {array} _args the rest of the message after the command
   * @param {Redis client} _redis Redis client (our database)
   * @param {num} _level users permission level
   */
  execute: async (message, _args, _redis, _level) => {
    const channel = "852211870378098751";

    // Roles
    const actuaryRole = message.guild.roles.cache.find(
      (role) => role.name === "Actuary"
    );
    const auditServicesRole = message.guild.roles.cache.find(
      (role) => role.name === "Audit Services"
    );
    const CAORole = message.guild.roles.cache.find(
      (role) => role.name === "CAO, Business Advisors"
    );
    const CFORole = message.guild.roles.cache.find(
      (role) => role.name === "Chief Financial Office"
    );
    const CLORole = message.guild.roles.cache.find(
      (role) => role.name === "Chief Legal Office"
    );
    const claimsRole = message.guild.roles.cache.find(
      (role) => role.name === "Claims"
    );
    const dataAnalyticsRole = message.guild.roles.cache.find(
      (role) => role.name === "Data & Analytics"
    );
    const enterpriseRiskRole = message.guild.roles.cache.find(
      (role) => role.name === "Enterprise Risk & Compliance"
    );
    const experienceManagementRole = message.guild.roles.cache.find(
      (role) => role.name === "Experience Management"
    );
    const federalSavingsBankRole = message.guild.roles.cache.find(
      (role) => role.name === "Federal Savings Bank"
    );
    const humanResourcesRole = message.guild.roles.cache.find(
      (role) => role.name === "Human Resources"
    );
    const informationSecurityRole = message.guild.roles.cache.find(
      (role) => role.name === "Information Security"
    );
    const informationTechnologyRole = message.guild.roles.cache.find(
      (role) => role.name === "Information Technology"
    );
    const lifeCompanyRole = message.guild.roles.cache.find(
      (role) => role.name === "Life Company"
    );
    const regulatoryRelationsRole = message.guild.roles.cache.find(
      (role) => role.name === "Regulatory Relations"
    );
    const stateManagementRole = message.guild.roles.cache.find(
      (role) => role.name === "State Management"
    );
    // Emojis

    const actuaryRoleEmoji = "🏓";
    const auditServicesRoleEmoji = "🏓";
    const CAORoleEmoji = "🏓";
    const CFORoleEmoji = "🏓";
    const CLORoleEmoji = "🏓";
    const claimsRoleEmoji = "🏓";
    const dataAnalyticsRoleEmoji = "🏓";
    const enterpriseRiskRoleEmoji = "🏓";
    const experienceManagementRoleEmoji = "🏓";
    const federalSavingsBankRoleEmoji = "🏓";
    const humanResourcesRoleEmoji = "🏓";
    const informationSecurityRoleEmoji = "🏓";
    const informationTechnologyRoleEmoji = "🏓";
    const lifeCompanyRoleEmoji = "🏓";
    const regulatoryRelationsRoleEmoji = "🏓";
    const stateManagementRoleEmoji = "🏓";

    roleEmbed.setColor("#e42643");
    roleEmbed.setTitle("**Role Menu: Internship Area**");
    roleEmbed.setDescription("React to give yourself a role!") +
      `${actuaryRoleEmoji} for Actuary` +
      `${auditServicesRoleEmoji} for Audit Services` +
      `${CAORoleEmoji} for CAO, Business Advisors` +
      `${CFORoleEmoji} for Chief Financial Office` +
      `${CLORoleEmoji} for Chief Legal Office` +
      `${claimsRoleEmoji} for Claims` +
      `${dataAnalyticsRoleEmoji} for Data & Analytics` +
      `${enterpriseRiskRoleEmoji} for Enterprise Risk & Compliance` +
      `${experienceManagementRoleEmoji} for Experience Management` +
      `${federalSavingsBankRoleEmoji} for Federal Savings Bank` +
      `${humanResourcesRoleEmoji} for Human Resources` +
      `${informationSecurityRoleEmoji} for Information Security` +
      `${informationTechnologyRoleEmoji} for Information Technology` +
      `${lifeCompanyRoleEmoji} for Life Company` +
      `${regulatoryRelationsRoleEmoji} for Regulatory Relations` +
      `${stateManagementRoleEmoji} for State Management`;

    let messageEmbed = await message.channel.send(roleEmbed);
    messageEmbed.react(actuaryRoleEmoji);
    messageEmbed.react(auditServicesRoleEmoji);
    messageEmbed.react(CAORoleEmoji);
    messageEmbed.react(CFORoleEmoji);
    messageEmbed.react(CLORoleEmoji);
    messageEmbed.react(claimsRoleEmoji);
    messageEmbed.react(dataAnalyticsRoleEmoji);
    messageEmbed.react(enterpriseRiskRoleEmoji);
    messageEmbed.react(experienceManagementRoleEmoji);
    messageEmbed.react(federalSavingsBankRoleEmoji);
    messageEmbed.react(humanResourcesRoleEmoji);
    messageEmbed.react(informationSecurityRoleEmoji);
    messageEmbed.react(informationTechnologyRoleEmoji);
    messageEmbed.react(lifeCompanyRoleEmoji);
    messageEmbed.react(regulatoryRelationsRoleEmoji);
    messageEmbed.react(stateManagementRoleEmoji);

    message.client.on("messageReactionAdd", async (reaction, user) => {
      if (reaction.message.partial) await reaction.message.fetch();
      if (reaction.partial) await reaction.fetch();
      if (user.bot) return;
      if (!reaction.message.guild) return;

      if (reaction.message.channel.id == channel) {
        if (reaction.emoji.name === actuaryRoleEmoji) {
          await reaction.message.guild.members.cache
            .get(user.id)
            .roles.add(actuaryRole);
        }
        if (reaction.emoji.name === auditServicesRoleEmoji) {
          await reaction.message.guild.members.cache
            .get(user.id)
            .roles.add(auditServicesRole);
        }
        if (reaction.emoji.name === CAORoleEmoji) {
          await reaction.message.guild.members.cache
            .get(user.id)
            .roles.add(CAORole);
        }
        if (reaction.emoji.name === CFORoleEmoji) {
          await reaction.message.guild.members.cache
            .get(user.id)
            .roles.add(CFORole);
        }
        if (reaction.emoji.name === CLORoleEmoji) {
          await reaction.message.guild.members.cache
            .get(user.id)
            .roles.add(CLORole);
        }
        if (reaction.emoji.name === claimsRoleEmoji) {
          await reaction.message.guild.members.cache
            .get(user.id)
            .roles.add(claimsRole);
        }
        if (reaction.emoji.name === dataAnalyticsRoleEmoji) {
          await reaction.message.guild.members.cache
            .get(user.id)
            .roles.add(dataAnalyticsRole);
        }
        if (reaction.emoji.name === enterpriseRiskRoleEmoji) {
          await reaction.message.guild.members.cache
            .get(user.id)
            .roles.add(enterpriseRiskRole);
        }
        if (reaction.emoji.name === experienceManagementRoleEmoji) {
          await reaction.message.guild.members.cache
            .get(user.id)
            .roles.add(experienceManagementRole);
        }
        if (reaction.emoji.name === federalSavingsBankRoleEmoji) {
          await reaction.message.guild.members.cache
            .get(user.id)
            .roles.add(federalSavingsBankRole);
        }
        if (reaction.emoji.name === humanResourcesRoleEmoji) {
          await reaction.message.guild.members.cache
            .get(user.id)
            .roles.add(humanResourcesRole);
        }
        if (reaction.emoji.name === informationSecurityRoleEmoji) {
          await reaction.message.guild.members.cache
            .get(user.id)
            .roles.add(informationSecurityRole);
        }
        if (reaction.emoji.name === informationTechnologyRoleEmoji) {
          await reaction.message.guild.members.cache
            .get(user.id)
            .roles.add(informationTechnologyRole);
        }
        if (reaction.emoji.name === lifeCompanyRoleEmoji) {
          await reaction.message.guild.members.cache
            .get(user.id)
            .roles.add(lifeCompanyRole);
        }
        if (reaction.emoji.name === regulatoryRelationsRoleEmoji) {
          await reaction.message.guild.members.cache
            .get(user.id)
            .roles.add(regulatoryRelationsRole);
        }
        if (reaction.emoji.name === stateManagementRoleEmoji) {
          await reaction.message.guild.members.cache
            .get(user.id)
            .roles.add(stateManagementRole);
        }
      }
    });

    message.client.on("messageReactionRemove", async (reaction, user) => {
      if (reaction.message.partial) await reaction.message.fetch();
      if (reaction.partial) await reaction.fetch();
      if (user.bot) return;
      if (!reaction.message.guild) return;

      if (reaction.message.channel.id == channel) {
        if (reaction.emoji.name === actuaryRoleEmoji) {
          await reaction.message.guild.members.cache
            .get(user.id)
            .roles.remove(actuaryRole);
        }
        if (reaction.emoji.name === auditServicesRoleEmoji) {
          await reaction.message.guild.members.cache
            .get(user.id)
            .roles.remove(auditServicesRole);
        }
        if (reaction.emoji.name === CAORoleEmoji) {
          await reaction.message.guild.members.cache
            .get(user.id)
            .roles.remove(CAORole);
        }
        if (reaction.emoji.name === CFORoleEmoji) {
          await reaction.message.guild.members.cache
            .get(user.id)
            .roles.remove(CFORole);
        }
        if (reaction.emoji.name === CLORoleEmoji) {
          await reaction.message.guild.members.cache
            .get(user.id)
            .roles.remove(CLORole);
        }
        if (reaction.emoji.name === claimsRoleEmoji) {
          await reaction.message.guild.members.cache
            .get(user.id)
            .roles.remove(claimsRole);
        }
        if (reaction.emoji.name === dataAnalyticsRoleEmoji) {
          await reaction.message.guild.members.cache
            .get(user.id)
            .roles.remove(dataAnalyticsRole);
        }
        if (reaction.emoji.name === enterpriseRiskRoleEmoji) {
          await reaction.message.guild.members.cache
            .get(user.id)
            .roles.remove(enterpriseRiskRole);
        }
        if (reaction.emoji.name === experienceManagementRoleEmoji) {
          await reaction.message.guild.members.cache
            .get(user.id)
            .roles.remove(experienceManagementRole);
        }
        if (reaction.emoji.name === federalSavingsBankRoleEmoji) {
          await reaction.message.guild.members.cache
            .get(user.id)
            .roles.remove(federalSavingsBankRole);
        }
        if (reaction.emoji.name === humanResourcesRoleEmoji) {
          await reaction.message.guild.members.cache
            .get(user.id)
            .roles.remove(humanResourcesRole);
        }
        if (reaction.emoji.name === informationSecurityRoleEmoji) {
          await reaction.message.guild.members.cache
            .get(user.id)
            .roles.remove(informationSecurityRole);
        }
        if (reaction.emoji.name === informationTechnologyRoleEmoji) {
          await reaction.message.guild.members.cache
            .get(user.id)
            .roles.remove(informationTechnologyRole);
        }
        if (reaction.emoji.name === lifeCompanyRoleEmoji) {
          await reaction.message.guild.members.cache
            .get(user.id)
            .roles.remove(lifeCompanyRole);
        }
        if (reaction.emoji.name === regulatoryRelationsRoleEmoji) {
          await reaction.message.guild.members.cache
            .get(user.id)
            .roles.remove(regulatoryRelationsRole);
        }
        if (reaction.emoji.name === stateManagementRoleEmoji) {
          await reaction.message.guild.members.cache
            .get(user.id)
            .roles.remove(stateManagementRole);
        }
      }
    });
  },
  test() {
    return true;
  },
};
