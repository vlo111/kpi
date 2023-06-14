import React, { useEffect, useState } from 'react';
import {
  useParams,
  useOutletContext,
  useLocation,
  useNavigate
} from 'react-router-dom';
import styled from 'styled-components';
import { Tabs } from 'antd';

import { ReactComponent as ArrowLeftSvg } from '../../assets/icons/arrow-left.svg';
import GetSingleSubActivity from '../../api/Activity/SubActivity/useGetSingleSubActivity';
import useGetApplicants from '../../api/Applicant/useGetApplicants';
import SubActivitySections from '../../components/Project/SubActivity/SubActivitySections';
import SubActivityHeader from '../../components/Project/SubActivity/SubActivtyHeader';
import ResultAreasTitles from '../ProjectOverview/ResultAreasTitles';
import AsnBreadcrumb from '../../components/Forms/Breadcrumb';
import { IOutletContext } from '../../types/project';
import AsnSpin from '../../components/Forms/Spin';
import { PATHS } from '../../helpers/constants';

const BackToTableButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 2rem;
`;

const Wrapper = styled.div<{ mode: string }>`
  padding: ${(props) =>
    props.mode === 'true' ? '2vh 0 0 1.5vw' : '40px 3.1vw 40px 3.1vw'};
  .custom_tab_wrapper {
    .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
      color: var(--dark-border-ultramarine) !important;
    }
    .ant-tabs-nav-list > .ant-tabs-tab-active {
      background-color: var(--white) !important;
    }
    .ant-tabs-tab {
      border: none !important;
      background: var(--dark-6);
      border-radius: 20px 20px 0px 0px !important;
      padding: 0 !important;
    }
    .ant-tabs-content-holder {
      background: var(--white);
      padding: 4vh 4.8vw 4vh 4.8vw;
    }
    .ant-tabs-nav {
      margin: 0 !important;
    }
    .ant-tabs-top > div > .ant-tabs-nav:before {
      display: none !important;
    }
  }
  .custom_section_tabs {
    .ant-tabs-tab {
      padding: 12px 0 !important;
      background: transparent !important;
    }
    .ant-tabs-content-holder {
      padding: 0vh 4.8vw 0vh 4.8vw;
    }
    .ant-tabs-nav-list .ant-tabs-tab-active {
      background-color: transparent !important;
    }
  }
`;

const SubActivity: React.FC = () => {
  const { setProjectOverview } = useOutletContext<IOutletContext>();
  const { id: subActivityId } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  const [courseTitle, setCourseTitle] = useState<string | undefined>(undefined);
  const [active, setActive] = useState<number>(1);
  const [search, setSearch] = useState<string | undefined>(undefined);
  const [courseId, setCourseId] = useState<string | undefined>(undefined);
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [offset, setOffset] = useState<number>(0);

  const { table } = location.state;

  const {
    data,
    refetch,
    isLoading: isLoadingSubActivity
  } = GetSingleSubActivity(
    subActivityId,
    { courseInfo: false },
    { enabled: Boolean(subActivityId) }
  );

  const { data: applicants, isLoading } = useGetApplicants(
    courseId ?? data?.sectionsData?.[0]?.id,
    search,
    offset,
    10,
    { enabled: Boolean(courseId ?? data?.sectionsData?.[0]?.id) }
  );

  const onChange = (key: string): void => {
    setCourseId(key);
    const index = data?.sectionsData?.findIndex(
      (item: { id: string }) => item.id === key
    );
    setTabIndex(index);
    const courseTitle = data?.sectionsData?.filter(
      (item: { id: string }) => item.id === key
    )[0].title;
    setCourseTitle(courseTitle);
  };

  const mode = (
    data?.inputActivity?.resultArea?.project?.id !== ''
      ? data?.sectionsData?.length > 1
      : false
  ).toString();

  useEffect(() => {
    setCourseTitle(data?.sectionsData?.[0]?.title);
    setProjectOverview({
      areaOrder: data?.inputActivity?.resultArea?.order,
      activityId: data?.inputActivityId,
      resultAreaTitle: data?.inputActivity?.resultArea?.title,
      activityTitle: data?.inputActivity?.title
    });
  }, [isLoadingSubActivity]);

  if (isLoadingSubActivity === true) {
    return <AsnSpin />;
  }

  return (
    <Wrapper mode={mode}>
      {table === true
        ? (
        <BackToTableButton
          onClick={() => {
            navigate(
              `/sub-activities/${PATHS.SUBACTIVITIES}`.replace(
                ':id',
                data?.inputActivity?.resultArea?.project?.id as string
              )
            );
          }}
        >
          <ArrowLeftSvg />
          <span>Back</span>
        </BackToTableButton>
          )
        : (
        <>
          {Boolean(data?.inputActivity?.resultArea?.project?.id) && (
            <AsnBreadcrumb
              routes={[
                {
                  path: `/project/overview/${
                    data?.inputActivity?.resultArea?.project?.id as string
                  }`,
                  breadcrumbName: data?.inputActivity?.resultArea?.title
                },
                {
                  path: `/project/overview/${
                    data?.inputActivity?.resultArea?.project?.id as string
                  }`,
                  breadcrumbName: data?.inputActivity?.title
                },
                {
                  path: '',
                  breadcrumbName: courseTitle ?? data?.sectionsData?.[0]?.title
                }
              ]}
            />
          )}
        </>
          )}
      {data?.sectionsData?.length > 1 && (
        <Tabs type="card" onChange={onChange} className="custom_tab_wrapper">
          {data?.sectionsData?.map(
            (item: { title: string, id: string }, i: number) => (
              <Tabs.TabPane
                key={item?.id}
                tab={
                  <ResultAreasTitles
                    title={item?.title}
                    projectItems={data?.sectionsData?.length}
                    index={i}
                    active={active}
                    setActive={setActive}
                    name={'subActivty'}
                  />
                }
              >
                <SubActivityHeader
                  inputActivityId={data?.id}
                  activity={item}
                  region={data?.region}
                />
                <SubActivitySections
                  activity={item}
                  navigateRouteInfo={{
                    courseTitle,
                    inputActivityTitle: data?.inputActivity?.title,
                    resultAreaTitle: data?.inputActivity?.resultArea?.title,
                    courseId: data?.id
                  }}
                  refetch={refetch}
                  index={i}
                  assignedUsers={data?.assignees}
                  applicationForm={data?.applicationForm}
                  applicants={tabIndex === i && applicants?.result}
                  setOffset={setOffset}
                  offset={offset}
                  applicantCounts={applicants?.count}
                  isLoading={isLoading}
                  setSearch={setSearch}
                  search={search}
                  sectionsCount={data?.sectionsData?.length}
                  tabIndex={tabIndex}
                />
              </Tabs.TabPane>
            )
          )}
        </Tabs>
      )}
      {data?.sectionsData?.length === 1 && (
        <>
          <SubActivityHeader
            inputActivityId={data?.id}
            activity={data?.sectionsData[0]}
            region={data.region}
          />
          <SubActivitySections
            refetch={refetch}
            navigateRouteInfo={{
              courseTitle,
              inputActivityTitle: data?.inputActivity?.title,
              resultAreaTitle: data?.inputActivity?.resultArea?.title,
              courseId: data?.id
            }}
            activity={data?.sectionsData[0]}
            index={0}
            assignedUsers={data?.assignees}
            applicationForm={data?.applicationForm}
            applicants={applicants?.result}
            setOffset={setOffset}
            offset={offset}
            applicantCounts={applicants?.count}
            isLoading={isLoading}
            setSearch={setSearch}
            search={search}
            sectionsCount={data?.sectionsData?.length}
            tabIndex={tabIndex}
          />
        </>
      )}
    </Wrapper>
  );
};

export default SubActivity;
