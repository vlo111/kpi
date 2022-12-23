import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Col, Row, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import { AsnForm } from '../../Forms/Form';
import { ConfirmModal } from '../../Forms/Modal/Confirm';
import { AsnButton } from '../../Forms/Button';
import { Items } from './Items';

import { PATHS } from '../../../helpers/constants';
import { Void } from '../../../types/global';
import { OpenDeleteResultModal, ProjectDetailsDelete, ProjectErrorResponse } from '../../../types/project';

import useGetProjectDetails from '../../../api/Details/useGetProjectDetails';
import useGetResultArea from '../../../api/ResultArea/useGetResultArea';
import useCreateProjectDetails from '../../../api/Details/useCreateProjectDetails';
import useUpdateProjectDetails from '../../../api/Details/useUpdateProjectDetails';

const antIcon = <LoadingOutlined style={{ fontSize: 100, color: 'var(--dark-border-ultramarine)' }} spin />;

export const VALIDATE_PROJECT_DETAILS_MESSAGES = {
  // eslint-disable-next-line no-template-curly-in-string
  required: 'Please enter a valid name',
  // eslint-disable-next-line no-template-curly-in-string
  string: { range: 'The name must be between ${min} and ${max} characters' }
};

export const ProjectDetailComponent: React.FC = () => {
  const [form] = AsnForm.useForm();

  const { id } = useParams();

  const navigate = useNavigate();

  const initialValues = {
    deletedOrganizationIds: [],
    deletedSectorIds: [],
    deletedRegionIds: []
  };

  // @ts-expect-error
  const { projectDetails, isLoading } = useGetProjectDetails(id);

  // @ts-expect-error
  const { resultAreas } = useGetResultArea(id);

  const [openDeleteResultModal, setOpenDeleteResultModal] = useState<OpenDeleteResultModal>();

  const onSuccess: Void = () => {
    const path = `/project/${PATHS.OVERVIEW}`
      .replace(':id', id ?? '');

    navigate(path);
  };

  const onError: ProjectErrorResponse = ({ response }) => {
    console.log('error', response);
  };

  const { mutate: createProjectDetails } = useCreateProjectDetails({
    onSuccess,
    onError
  });

  const { mutate: updateProjectDetails } = useUpdateProjectDetails({
    onSuccess,
    onError
  });

  const onFinish: Void = () => {
    if (id !== undefined) {
      const { deletedOrganizationIds, deletedRegionIds, deletedSectorIds, organizations, regions, sectors } = form.getFieldValue([]);

      const data = {
        organizations,
        regions,
        sectors
      };

      if (projectDetails?.sectors.length !== 0) {
        updateProjectDetails({
          id,
          data: {
            ...data,
            deletedSectorIds,
            deletedOrganizationIds,
            deletedRegionIds,
            publish: true
          }
        });
      } else {
        createProjectDetails({
          id,
          data: {
            ...data,
            publish: true
          }
        });
      }
    }
  };

  useEffect(() => {
    if (projectDetails?.sectors?.length !== 0) {
      form.setFieldsValue(projectDetails);
    } else {
      const initField = [{ title: '' }];

      form.setFieldsValue({
        organizations: initField,
        regions: initField,
        sectors: initField
      });
    }
  }, [projectDetails, form]);

  useEffect(() => {
    if (resultAreas !== undefined && resultAreas.length === 0) {
      if (id !== undefined) {
        // navigate(`/project/${id}/steps/0`);
      }
    }
  }, [resultAreas, form]);

  const onDeleteHandler: ProjectDetailsDelete = (remove, fieldName, title) => {
    setOpenDeleteResultModal({ remove, fields: fieldName, title });
  };

  const submitDeleteModal: Void = () => {
    if (openDeleteResultModal != null) {
      const { title, remove, fields } = openDeleteResultModal;

      const deleteName = `deleted${title.slice(0, -1)}Ids`;

      const deletedFields = form.getFieldValue(deleteName) ?? [];

      const currentId = form.getFieldValue(title.toLocaleLowerCase())[fields]?.id;

      if (currentId !== undefined) {
        const updateDeletedIds = deletedFields.concat(currentId);

        form.setFieldsValue({ [deleteName]: updateDeletedIds });
      }

      remove(fields);
    }
    setOpenDeleteResultModal(undefined);
  };

  if (isLoading === true) {
    return <Spin indicator={antIcon} />;
  }

  return (
    <>
      <AsnForm
        form={form}
        initialValues={initialValues}
        validateMessages={VALIDATE_PROJECT_DETAILS_MESSAGES}
        name="dynamic_form_item"
        onFinish={onFinish}
      >
        <Items name="organizations" title='Organizations' onDelete={onDeleteHandler}/>
        <Items name="regions" title='Regions' onDelete={onDeleteHandler}/>
        <Items name="sectors" title='Sectors' onDelete={onDeleteHandler}/>
        <Row className="accept-buttons">
          <Col>
            <AsnButton
              className="default"
              onClick={() => {
                const path = `/project/${PATHS.STEPS}`
                  .replace(':id', id ?? '')
                  .replace(':index', '0');

                navigate(path);
              }}
            >
              Previous
            </AsnButton>
          </Col>
          {/* <Col> */}
          {/*   <AsnButton className="default" htmlType="submit">Save as Draft</AsnButton> */}
          {/* </Col> */}
          <Col>
            <AsnButton className="primary" htmlType="submit">
              Publish
            </AsnButton>
          </Col>
        </Row>
      </AsnForm>
      <ConfirmModal
        styles={{ gap: '6rem' }}
        yes="Delete"
        no="Cancel"
        open={openDeleteResultModal}
        title="Are you sure you want to delete  the field?"
        onSubmit={submitDeleteModal}
        onCancel={() => setOpenDeleteResultModal(undefined)}
      />
    </>
  );
};
