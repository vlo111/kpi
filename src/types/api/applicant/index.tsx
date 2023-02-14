import { UseMutation, Void } from '../../global';
import { ResponseErrorParam } from '../project/get-project';
import { IUploadFileError } from '../../files';

interface IFileData { id: string, files: string[] }

interface IApproveApplicant { sectionId: string, applicantId: string, note: string }

interface IRejectApplicant { sectionId: string, applicantIds: string, note: string, reasonsForRejection: string }

export type UseApproveApplicant = UseMutation<Void, any, ResponseErrorParam, IApproveApplicant>

export type UseApplicantAttachFile = UseMutation<Void, any, ResponseErrorParam, IFileData>

export type UseFinishApplicant = UseMutation<Void, IUploadFileError, ResponseErrorParam, { id: string }>

export type UseRejectApplicant = UseMutation<Void, IUploadFileError, ResponseErrorParam, IRejectApplicant>
