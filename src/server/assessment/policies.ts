import {AssessmentStatus,RecordStatus,UserRole} from "../../../generated/prisma/enums";
import {can} from "@/server/auth/authorization";
export function assertAssessmentOwner(userId:string,ownerId:string){if(userId!==ownerId)throw new Error("ASSESSMENT_NOT_FOUND")}
export function assertCurrentRevision(expected:string|undefined,current:Date){if(expected&&expected!==current.toISOString())throw new Error("STALE_DRAFT")}
export function assertTemplateMutable(status:RecordStatus){if(status!==RecordStatus.DRAFT)throw new Error("PUBLISHED_TEMPLATE_IMMUTABLE")}
export function canApproveSafetyRule(role:UserRole){return can(role,"assessments:configure")&&can(role,"settings:write")}
export function correctionTransition(status:AssessmentStatus){if(status!==AssessmentStatus.NEEDS_MORE_INFORMATION)throw new Error("ASSESSMENT_NOT_CORRECTABLE");return{fromStatus:status,toStatus:AssessmentStatus.DRAFT,preserveSubmission:true}}
export function sensitiveAuditMetadata(purpose:string,status:string,answerCount:number){return{purpose:purpose.replace(/<[^>]*>/g,"").slice(0,120),status,answerCount}}
