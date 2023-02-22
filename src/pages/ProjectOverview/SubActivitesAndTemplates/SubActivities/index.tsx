import React, { useState } from "react";
import {
  Row,
  Space,
  Button,
  Card,
  Col,
  Typography,
  Tooltip,
  Avatar,
} from "antd";
import styled from "styled-components";
import moment from "moment";

import { Void } from "../../../../types/global";
import { ISubActivities, ISubActivitiesProps } from "../../../../types/project";
import { AsnCardSubActivity } from "../../../../components/Forms/Card/SubActivityCard";
import { ReactComponent as Calendar } from "../../../../assets/icons/calendar.svg";
import { ReactComponent as Location } from "../../../../assets/icons/location.svg";
import { AsnButton } from "../../../../components/Forms/Button";
import { AssingnesFilter } from "../Filter/Assigned";
import { DateFilterCards } from "../Filter/DataPicker";
import { StatusFilter } from "../Filter/Status";
import AddSubActivity from "../AddActivity";
import { useNavigate } from "react-router-dom";
import AsnAvatar from "../../../../components/Forms/Avatar";
import { AssignedUserType } from "../../../../types/api/activity/subActivity";

const Container = styled.div`
  .ant-select:not(.ant-select-customize-input) .ant-select-selector {
    border: none;
  }
  .ant-card-bordered {
    border: none;
  }
  .subCardTemplater {
    color: #111b23;
  }
  .ant-typography strong {
    font-weight: 400;
  }
`;
const { Paragraph } = Typography;

export const SubActivity: React.FC<ISubActivitiesProps> = ({
  subActivities,
  setCheckAll,
  setIndeterminate,
  setCheckedList,
  checkAll,
  indeterminate,
  checkedList,
  setDateSearch,
  dateSearch,
  templates,
  inputActivityId,
  setAssignedUsersIds,
}) => {
  const [isOpenCreateActivityModal, setIsOpenCreateActivityModal] =
    useState<boolean>(false);
  const resetFilter: Void = () => {
    setDateSearch({
      start: true,
      from: "",
      to: "",
    });
    setCheckedList([]);
    setAssignedUsersIds([]);
  };

  const navigate = useNavigate();
  return (
    <>
      <Container>
        <Space align="baseline">
          <StatusFilter
            setCheckAll={setCheckAll}
            setIndeterminate={setIndeterminate}
            setCheckedList={setCheckedList}
            checkAll={checkAll}
            indeterminate={indeterminate}
            checkedList={checkedList}
          />
          <AssingnesFilter
            inputActivityId={inputActivityId}
            setAssignedUsersIds={setAssignedUsersIds}
          />
          <DateFilterCards
            setDateSearch={setDateSearch}
            dateSearch={dateSearch}
          />
          <AsnButton
            type="link"
            onClick={resetFilter}
            style={{
              fontSize: "var(--font-size-small",
              color: "var(--dark-1)",
            }}
          >
            Reset
          </AsnButton>
        </Space>
        <Space align="baseline"></Space>
        <Row>
          <AsnCardSubActivity>
            <Row
              gutter={24}
              style={{
                gridGap: "41px",
                padding: "16px 0px",
                overflow: "auto",
                height: "calc(100vh - 61vh)",
              }}
            >
              <Button
                type="link"
                block
                style={{
                  color: "var(--dark-1)",
                  fontSize: "var(--base-font-size)",
                }}
                onClick={() => setIsOpenCreateActivityModal(true)}
              >
                + Add Sub Activity
              </Button>
              {subActivities?.map((item: ISubActivities, i: number) => (
                <Card
                  key={i}
                  className={`card ${
                    item?.status === "INACTIVE"
                      ? "cardInactive"
                      : item?.status === "DONE"
                      ? "cardActive"
                      : "carDone"
                  }`}
                >
                  <div
                    className={`cardRound ${
                      item?.status === "INACTIVE"
                        ? "cardRoundInactive"
                        : item?.status === "DONE"
                        ? "cardDone"
                        : ""
                    }`}
                  >
                    {item?.cardRound}
                  </div>
                  <Row
                    gutter={[8, 16]}
                    style={{ padding: "15px 0", cursor: "pointer" }}
                    onClick={() =>
                      navigate(`/project/sub-activity/${item?.subActivityId}`)
                    }
                  >
                    <Col
                      style={{
                        color: "var(--dark-1)",
                        fontSize: "var(--headline-font-size)",
                        display: "flex",
                        gap: "3px",
                        width: "110px",
                        height: "44px",
                      }}
                    >
                      <Tooltip title={item?.title}>
                        <Paragraph
                          strong
                          ellipsis={{
                            rows: 1,
                          }}
                          className="subCardTemplater"
                        >
                          {item?.title}
                        </Paragraph>
                      </Tooltip>
                    </Col>
                    <Col style={{ display: "flex", gap: "3px" }}>
                      <Location /> {item?.subActivity?.region?.title}
                    </Col>
                    <Col
                      style={{ display: "flex", gap: "3px", fontSize: "12px" }}
                    >
                      <Calendar />
                      {moment(item?.startDate).format("DD/MM/YY")} -{" "}
                      {moment(item?.endDate).format("DD/MM/YY")}
                    </Col>
                    <Space size={[10, 0]} align="start">
                      <Col>
                        <Tooltip title={item?.subActivity?.sector?.title}>
                          <Paragraph
                            strong
                            ellipsis={{
                              rows: 2,
                            }}
                            className="subCardTemplater"
                          >
                            {item?.subActivity?.sector?.title}
                          </Paragraph>
                        </Tooltip>
                      </Col>
                      <Col span={24}>
                        <Avatar.Group maxCount={2}>
                          {item?.subActivity?.assignees.map(
                            (i: AssignedUserType) => {
                              return (
                                <Tooltip
                                  key={i?.id}
                                  placement="top"
                                  title={`${i?.firstName} ${i?.lastName}`}
                                >
                                  <AsnAvatar
                                    letter={`${i?.firstName?.charAt(
                                      0
                                    )}${i?.lastName?.charAt(0)}`}
                                    src={i.photo}
                                  />
                                </Tooltip>
                              );
                            }
                          )}
                        </Avatar.Group>
                      </Col>
                    </Space>
                  </Row>
                </Card>
              ))}
            </Row>
          </AsnCardSubActivity>
        </Row>
      </Container>
      {isOpenCreateActivityModal && (
        <AddSubActivity
          setIsOpenCreateActivityModal={setIsOpenCreateActivityModal}
          isOpenCreateActivityModal={isOpenCreateActivityModal}
          templates={templates}
        />
      )}
    </>
  );
};
