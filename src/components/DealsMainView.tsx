/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  H2,
  HorizontalDivider,
  Stack,
  useInitialisedDeskproAppClient,
  VerticalDivider,
} from "@deskpro/app-sdk";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import { LogoAndLinkButton } from "./LogoAndLinkButton";
import { useState } from "react";
import { IPipedriveDeal } from "../types/pipedrive/pipedriveDeal";
import { getDeals } from "../api/api";
import { IPipedriveContact } from "../types/pipedrive/pipedriveContact";

export const DealsMainView = ({
  contact,
  orgName,
}: {
  contact: IPipedriveContact;
  orgName: string;
}) => {
  const navigate = useNavigate();
  const [deals, setDeals] = useState<IPipedriveDeal[]>([]);

  useInitialisedDeskproAppClient(
    async (client) => {
      if (!contact.owner_id.id || !contact.id) return;

      const dealsReq = await getDeals(client, orgName, contact.owner_id.id);

      if (!dealsReq.success) return;

      setDeals(
        dealsReq?.data?.filter((e) => e.person_id.value === contact.id) ?? []
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
        <Stack gap={2} style={{ alignItems: "center" }}>
          <h1 style={{ fontSize: "12px" }}>Deals ({deals.length})</h1>
          <FontAwesomeIcon
            icon={faPlus}
            style={{ width: "12px", marginLeft: "5px", cursor: "pointer" }}
            onClick={() => navigate("/createdeal")}
          ></FontAwesomeIcon>
        </Stack>
        <LogoAndLinkButton endpoint={`deals/user/${contact.owner_id.id}`} />
      </Stack>
      <Stack vertical style={{ width: "100%" }}>
        {deals.map((deal, i) => {
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
                <h1
                  style={{
                    color: "#3A8DDE",
                    fontSize: "12px",
                    cursor: "pointer",
                  }}
                  onClick={() => navigate("/dealdetails/" + deal.id)}
                >
                  {deal.title}
                </h1>
                <LogoAndLinkButton endpoint={`deal/${deal.id}`} />
              </Stack>
              <Stack>
                <H2 style={{ color: "blue" }}>{deal.add_time.split(" ")[0]}</H2>
                <Stack style={{ marginLeft: "40px" }}>
                  <VerticalDivider
                    style={{ height: "15px", width: "1px", color: "#EFF0F0" }}
                  ></VerticalDivider>
                  <H2>
                    {Intl.NumberFormat("en-IN").format(deal.value) +
                      " " +
                      deal.currency}
                  </H2>
                </Stack>
              </Stack>
              <HorizontalDivider
                style={{
                  width: "110%",
                  color: "#EFF0F0",
                  marginLeft: "-10px",
                  marginBottom: "5px",
                }}
              />
            </Stack>
          );
        })}
      </Stack>
    </Stack>
  );
};
