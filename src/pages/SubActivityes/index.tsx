import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Tabs } from 'antd';

import GetSingleSubActivity from '../../api/Activity/SubActivity/useGetSingleSubActivity';
import AsnBreadcrumb from '../../components/Forms/Breadcrumb';
import SubActivitySections from '../../components/Project/SubActivity/SubActivitySections';
import SubActivityHeader from '../../components/Project/SubActivity/SubActivtyHeader';
import ResultAreasTitles from '../ProjectOverview/ResultAreasTitles';

const Wrapper = styled.div<{ mode: boolean }>`
  padding: ${(props) => props.mode ? '2vh 0 0 1.5vw' : '40px 3.1vw 40px 3.1vw'};
  .custom_tab_wrapper{
    .ant-tabs-tab.ant-tabs-tab-active
    .ant-tabs-tab-btn{
      color: var(--dark-border-ultramarine) !important;
    }
    .ant-tabs-tab-active{
      background-color: white ;
    }
    .ant-tabs-tab{
      border: none !important;
      background: var(--dark-6);
      border-radius: 20px 20px 0px 0px !important;
      padding : 0 !important;
    }
    .ant-tabs-content-holder{
      background: white;
      padding: 4vh 4.8vw 0 4.8vw;
    }
    .ant-tabs-nav{
      margin: 0 !important;
    }
    .ant-tabs-top>div>.ant-tabs-nav:before{
      display: none !important;
    }
  }
`;

const SubActivity: React.FC<{}> = () => {
  const { id: subActivityId } = useParams<{ id: any }>();
  const [itemTitle, setItemTitle] = useState('');
  console.log(
    subActivityId,
    'd890eefd-bb0f-4cc8-aa38-99224356c785',
    'c9ae6d05-7e68-4cce-b7fa-1ae6fb2b689d'
  );
  const { data } = GetSingleSubActivity('c9ae6d05-7e68-4cce-b7fa-1ae6fb2b689d', {});

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
        <Tabs type="card" onChange={onChange} className='custom_tab_wrapper'>
          {data?.sectionsData?.map((item: { title: string, id: string }, i: number) => (
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
              <SubActivitySections activity={item} index={i} manager={data?.manager}/>
            </Tabs.TabPane>
          ))}
        </Tabs>
      )}
      {data?.sectionsData?.length === 1 && (
        <>
          <SubActivityHeader
            activity={data?.sectionsData[0]}
            region={data.region}
          />
          <SubActivitySections activity={data?.sectionsData[0]} />
        </>
      )}
    </Wrapper>
  );
};

export default SubActivity;
