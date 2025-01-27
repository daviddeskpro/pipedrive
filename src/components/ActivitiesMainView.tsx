/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  HorizontalDivider,
  Stack,
  useInitialisedDeskproAppClient,
  VerticalDivider,
} from "@deskpro/app-sdk";

import { Property } from "./Property";
import { LogoAndLinkButton } from "./LogoAndLinkButton";
import { IPipedriveActivity } from "../types/pipedrive/pipedriveActivity";
import { useState } from "react";
import { getActivitiesByUserId } from "../api/api";
import { IPipedriveContact } from "../types/pipedrive/pipedriveContact";

export const ActivitiesMainView = ({
  contact,
  orgName,
}: {
  contact: IPipedriveContact;
  orgName: string;
}) => {
  const [activities, setActivities] = useState<IPipedriveActivity[]>([]);

  useInitialisedDeskproAppClient(
    async (client) => {
      if (!contact.owner_id.id || !contact.id) return;

      const activitiesReq = await getActivitiesByUserId(
        client,
        orgName,
        contact.owner_id.id
      );

      if (!activitiesReq.success) return;

      setActivities(
        activitiesReq?.data?.filter((e) => e.person_id === contact.id) ?? []
      );
    },
    [contact]
  );

  return (
    <Stack vertical style={{ width: "100%" }}>
      <Stack
        style={{
          width: "100%",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Stack gap={"2px"}>
          <h1 style={{ alignSelf: "center", fontSize: "12px" }}>
            Activities ({activities.length})
          </h1>
          {/* <FontAwesomeIcon
            icon={faPlus}
            style={{ alignSelf: "center", width: "12px", marginLeft: "5px" }}
          ></FontAwesomeIcon> */}
        </Stack>
      </Stack>
      <Stack vertical style={{ width: "100%" }}>
        {activities.map((activity, i) => {
          const date = new Date(activity.due_date);
          return (
            <Stack
              key={i}
              vertical
              gap={5}
              style={{ width: "100%", marginTop: "5px" }}
            >
              <Stack
                style={{
                  alignItems: "center",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <h1 style={{ fontSize: "12px" }}>{activity.note}</h1>
                <LogoAndLinkButton
                  endpoint={`activities/list/user/${contact.owner_id.id}`}
                />
              </Stack>
              <Stack>
                <Property title="Type">
                  {activity.type.charAt(0).toUpperCase() +
                    activity.type.slice(1)}
                </Property>
                <Stack style={{ marginLeft: "40px" }}>
                  <VerticalDivider
                    style={{
                      height: "35px",
                      width: "1px",
                      color: "#EFF0F0",
                      marginBottom: "5px",
                    }}
                  ></VerticalDivider>
                  <Property title="Date">{`${date.getDay()} ${date
                    .toLocaleString("default", { month: "long" })
                    .slice(0, 3)}, ${date.getFullYear()}`}</Property>
                </Stack>
              </Stack>
              <HorizontalDivider
                style={{ width: "110%", color: "#EFF0F0", marginLeft: "-10px" }}
              />
            </Stack>
          );
        })}
      </Stack>
    </Stack>
  );
};
