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
import { AntDesignOutlined, UserOutlined } from "@ant-design/icons";
import AsnAvatar from "../../../../components/Forms/Avatar";
// import { User } from './userApplicants';

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
const { Paragraph, Title } = Typography;

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
          <AssingnesFilter />
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
                      : ""
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
                        gap: "5px",
                        width: "100px",
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
                    <Col style={{ display: "flex", gap: "5px" }}>
                      <Location /> {item?.subActivity?.region?.title}
                    </Col>
                    <Col
                      style={{ display: "flex", gap: "5px", fontSize: "12px" }}
                    >
                      <Calendar />
                      {moment(item?.startDate).format("DD/MM/YY")} -{" "}
                      {moment(item?.endDate).format("DD/MM/YY")}
                    </Col>
                    <Space size={[10, 0]} align="start">
                      <Col>{item?.subActivity?.sector?.title} </Col>
                      <Col span={24}>
                        {item?.subActivity?.assignees.map((i: any) => {
                          return (
                            <Avatar.Group maxCount={2}>
                              <AsnAvatar
                                letter={`${i?.firstName?.charAt(
                                  0
                                )}${i?.lastName?.charAt(0)}`}
                                src={i.photo}
                              />
                            </Avatar.Group>
                          );
                        })}
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
