import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Tabs } from 'antd';

import GetSingleSubActivity from '../../api/Activity/SubActivity/useGetSingleSubActivity';
import SubActivitySections from '../../components/Project/SubActivity/SubActivitySections';
import SubActivityHeader from '../../components/Project/SubActivity/SubActivtyHeader';
import ResultAreasTitles from '../ProjectOverview/ResultAreasTitles';
import AsnBreadcrumb from '../../components/Forms/Breadcrumb';

const Wrapper = styled.div<{ mode: boolean }>`
  padding: ${(props) =>
    props.mode ? '2vh 0 0 1.5vw' : '40px 3.1vw 40px 3.1vw'};
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
      background: white;
      padding: 4vh 4.8vw 4vh 4.8vw;
    }
    .ant-tabs-nav {
      margin: 0 !important;
    }
    .ant-tabs-top > div > .ant-tabs-nav:before {
      display: none !important;
    }
  }
`;

const SubActivity: React.FC<{}> = () => {
  const { id: subActivityId } = useParams<{ id: string }>();
  const [itemTitle, setItemTitle] = useState('');
  console.log(
    subActivityId,
    'bee8bb4f-3b24-4246-9305-95f611f36cfe one 52088e17-723a-47d6-9640-6b7cf13d7972 f06f3725-a1ed-4e23-bb50-08fc32435410',
    'ac52307a-5ec1-4a0b-905d-0f921ca3e6e3 multi 08802614-0903-4aa4-a803-5bac3d49e9c9 34a7562f-5260-4111-869d-45b889000284',
    'f33d3e0b-83a3-4cd4-aec5-630a2fc905e4 fix courses other id'
  );
  const { data, refetch } = GetSingleSubActivity(subActivityId, {});

  const onChange = (key: string): void => {
    setItemTitle(key);
  };

  useEffect(() => {
    setItemTitle(data?.sectionsData[0]?.title);
  }, [data]);

  return (
    <Wrapper mode={data?.sectionsData?.length > 1}>
      <AsnBreadcrumb
        routes={[
          {
            path: '/project/sub-activity/:id1',
            breadcrumbName: 'Activity 1'
          },
          {
            path: '/project/sub-activity/:id2',
            breadcrumbName: 'Activity 1.3'
          },
          {
            path: '/project/sub-activity/',
            breadcrumbName: itemTitle
          }
        ]}
      />
      {data?.sectionsData?.length > 1 && (
        <Tabs type="card" onChange={onChange} className="custom_tab_wrapper">
          {data?.sectionsData?.map(
            (item: { title: string, id: string }, i: number) => (
              <Tabs.TabPane
                key={item.title}
                tab={
                  <ResultAreasTitles
                    title={item.title}
                    projectItems={data?.sectionsData?.length}
                    index={i}
                    active={1}
                    setActive={() => true}
                  />
                }
              >
                <SubActivityHeader activity={item} region={data.region} />
                <SubActivitySections
                  activity={item}
                  refetch={refetch}
                  index={i}
                  manager={data?.manager}
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
            activity={data?.sectionsData[0]}
            region={data.region}
          />
          <SubActivitySections
            refetch={refetch}
            activity={data?.sectionsData[0]}
            index={0}
            manager={data?.manager}
            applicationForm={data?.applicationForm}
          />
        </>
      )}
    </Wrapper>
  );
};

export default SubActivity;
