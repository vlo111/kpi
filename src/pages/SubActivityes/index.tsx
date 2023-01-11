import { Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import GetSingleSubActivity from '../../api/Activity/SubActivity/useGetSingleSubActivity';
import AsnBreadcrumb from '../../components/Forms/Breadcrumb';
import SubActivitySections from '../../components/Project/SubActivity/SubActivitySections';
import SubActivityHeader from '../../components/Project/SubActivity/SubActivtyHeader';

const Wrapper = styled.div`
  padding: 40px 3.1vw 40px 3.1vw;
`;

const SubActivity: React.FC<{}> = () => {
  const { id: subActivityId } = useParams<{ id: any }>();
  const [itemTitle, setItemTitle] = useState('');
  console.log(
    subActivityId,
    'd890eefd-bb0f-4cc8-aa38-99224356c785',
    'c9ae6d05-7e68-4cce-b7fa-1ae6fb2b689d'
  );
  const { data } = GetSingleSubActivity(
    'c9ae6d05-7e68-4cce-b7fa-1ae6fb2b689d',
    {
      onSuccess: (data: { result: any, count: any }) => console.log('')
    }
  );
  const onChange = (key: string): any => {
    setItemTitle(key);
  };

  useEffect(() => {
    setItemTitle(data?.sectionsData[0]?.title);
  }, [data]);

  return (
    <Wrapper>
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
            path: '',
            breadcrumbName: itemTitle
          }
        ]}
      />
      {data?.sectionsData?.length > 1 && (
        <Tabs type="card" onChange={onChange}>
          {data?.sectionsData?.map((item: { title: string, id: string }) => (
            <Tabs.TabPane
              key={item.title}
              tab={<p>{item.title}</p>}>
              <SubActivityHeader activity={item} region={data.region}/>
              <SubActivitySections activity={item} />
            </Tabs.TabPane>
          ))}
        </Tabs>
      )}
      {data?.sectionsData?.length === 1 && (
        <>
          <SubActivityHeader activity={data?.sectionsData[0]} region={data.region}/>
          <SubActivitySections activity={data?.sectionsData[0]} />
        </>
      )}
    </Wrapper>
  );
};

export default SubActivity;
