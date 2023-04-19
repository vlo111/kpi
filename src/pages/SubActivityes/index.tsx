import React, { useEffect, useState } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
import styled from 'styled-components';
import { Tabs } from 'antd';

import GetSingleSubActivity from '../../api/Activity/SubActivity/useGetSingleSubActivity';
import SubActivitySections from '../../components/Project/SubActivity/SubActivitySections';
import SubActivityHeader from '../../components/Project/SubActivity/SubActivtyHeader';
import ResultAreasTitles from '../ProjectOverview/ResultAreasTitles';
import AsnBreadcrumb from '../../components/Forms/Breadcrumb';
import { IOutletContext } from '../../types/project';

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

const SubActivity: React.FC<{}> = () => {
  const { setProjectOverview } = useOutletContext<IOutletContext>();
  const { id: subActivityId } = useParams<{ id: string }>();
  const [courseTitle, setCourseTitle] = useState('');
  const [activityTitle, setActivityTitle] = useState('');
  const [resultAreaTitle, setResultAreaTitle] = useState('');
  const [projectId, setProjectId] = useState('');
  const { data, refetch } = GetSingleSubActivity(subActivityId, { courseInfo: false }, {});
  const [active, setActive] = useState<number>(1);

  const onChange = (key: string): void => {
    setCourseTitle(key);
  };

  useEffect(() => {
    setCourseTitle(data?.sectionsData[0]?.title);
    setActivityTitle(data?.inputActivity?.title);
    setResultAreaTitle(data?.inputActivity?.resultArea?.title);
    setProjectId(data?.inputActivity?.resultArea?.project?.id);
    setProjectOverview({
      areaOrder: data?.inputActivity?.resultArea?.order,
      activityId: data?.inputActivityId,
      resultAreaTitle: data?.inputActivity?.resultArea?.title,
      activityTitle: data?.inputActivity?.title
    });
  }, [data]);

  const mode = (
    projectId !== '' ? data?.sectionsData?.length > 1 : false
  ).toString();

  return (
    <Wrapper mode={mode}>
      {Boolean(projectId) && (
        <AsnBreadcrumb
          routes={[
            {
              path: `/project/overview/${projectId}`,
              breadcrumbName: resultAreaTitle
            },
            {
              path: `/project/overview/${projectId}`,
              breadcrumbName: activityTitle
            },
            {
              path: '',
              breadcrumbName: courseTitle
            }
          ]}
        />
      )}
      {data?.sectionsData?.length > 1 && (
        <Tabs type="card" onChange={onChange} className="custom_tab_wrapper">
          {data?.sectionsData?.map(
            (item: { title: string, id: string }, i: number) => (
              <Tabs.TabPane
                key={item.id}
                tab={
                  <ResultAreasTitles
                    title={item.title}
                    projectItems={data?.sectionsData?.length}
                    index={i}
                    active={active}
                    setActive={setActive}
                    name={'subActivty'}
                  />
                }
              >
                <SubActivityHeader inputActivityId={data?.id} activity={item} region={data?.region} />
                <SubActivitySections
                  activity={item}
                  navigateRouteInfo={{ courseTitle, inputActivityTitle: activityTitle, resultAreaTitle, courseId: data?.id }}
                  refetch={refetch}
                  index={i}
                  assignedUsers={data?.assignees}
                  applicationForm={data?.applicationForm}
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
            navigateRouteInfo={{ courseTitle, inputActivityTitle: activityTitle, resultAreaTitle, courseId: data?.id }}
            activity={data?.sectionsData[0]}
            index={0}
            assignedUsers={data?.assignees}
            applicationForm={data?.applicationForm}
          />
        </>
      )}
    </Wrapper>
  );
};

export default SubActivity;
