import React, { useEffect, useState } from 'react';
import { AsnForm } from '../../Forms/Form';
import { OpenDeleteResultModal, ProjectErrorResponse } from '../../../types/project';
import { ConfirmModal } from '../../Forms/Modal/Confirm';
import { Items } from './Items';
import { Col, Row } from 'antd';
import { AsnButton } from '../../Forms/Button';
import { PATHS } from '../../../helpers/constants';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetProjectDetails } from '../../../api/Project/Details/useGetProjectDetails';
import useCreateResultArea from '../../../api/Project/ResultArea/useCreateResultArea';
import { Void } from '../../../types/global';

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

  const projectDetails = useGetProjectDetails(id);

  const [openDeleteResultModal, setOpenDeleteResultModal] = useState<OpenDeleteResultModal>();

  const onSuccess: Void = () => {
    const path = `/project/${PATHS.STEPS}`
      .replace(':id', id ?? '')
      .replace(':index', '1');

    navigate(path);
  };

  const onError: ProjectErrorResponse = ({ response }) => {
    console.log('error', response);
  };

  const { mutate: createProjectDetails } = useCreateResultArea({
    onSuccess,
    onError
  });

  const onFinish: any = (values: any) => {
    if (id !== undefined) {
      if (projectDetails?.length != null) {
        // updateResultArea({
        //   id,
        //   data: form.getFieldsValue()
        // });
      } else {
        console.log('zaza -- ', form.getFieldsValue());
        createProjectDetails({
          id,
          data: form.getFieldsValue()
        });
      }
    }
  };

  useEffect(() => {
    if (projectDetails !== undefined && projectDetails.length !== 0) {
      form.setFieldsValue({ projectDetails });
    } else {
      console.log(form.getFieldsValue());
      form.setFieldsValue({
        organisation: [''],
        region: [''],
        sector: ['']
      });
    }
  }, [projectDetails]);

  return (
    <>
      <AsnForm validateMessages={VALIDATE_PROJECT_DETAILS_MESSAGES} form={form} name="dynamic_form_item" onFinish={onFinish}>
        <Items name="organisation" title='Organisations' onDelete={(remove, fields) => {
          setOpenDeleteResultModal({ remove, fields });
        }}/>
        <Items name="sector" title='Regions' onDelete={(remove, fields) => {
          setOpenDeleteResultModal({ remove, fields });
        }}/>
        <Items name="region" title='Sectors' onDelete={(remove, fields) => {
          setOpenDeleteResultModal({ remove, fields });
        }}/>
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
          <Col>
            <AsnButton className="default" htmlType="submit">Save as Draft</AsnButton>
          </Col>
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
        onSubmit={() => {
          if (openDeleteResultModal != null) { openDeleteResultModal.remove(openDeleteResultModal.fields); }
          setOpenDeleteResultModal(undefined);
        }}
        onCancel={() => setOpenDeleteResultModal(undefined)}
      />
    </>
  );
};
