import {PrismaPg} from "@prisma/adapter-pg";import {PrismaClient,UserRole} from "../generated/prisma/client";
const url=process.env.DATABASE_URL,email=process.env.ADMIN_SEED_EMAIL?.trim().toLowerCase(),role=process.env.ADMIN_SEED_ROLE as UserRole|undefined;
if(!url||!email)throw new Error("DATABASE_URL and ADMIN_SEED_EMAIL are required.");
if(process.env.VERCEL_ENV==="production")throw new Error("Admin promotion is disabled in Production.");
const allowed:UserRole[]=[UserRole.STORE_OWNER,UserRole.CONTENT_MANAGER,UserRole.ORDER_MANAGER,UserRole.ADMIN];if(!role||!allowed.includes(role))throw new Error("ADMIN_SEED_ROLE must be a permitted operational role.");
const db=new PrismaClient({adapter:new PrismaPg({connectionString:url})});
const user=await db.user.findUnique({where:{email},select:{id:true,role:true}});if(!user)throw new Error("Register the account normally first; no password is created by this script.");
await db.$transaction([db.user.update({where:{id:user.id},data:{role}}),db.auditLog.create({data:{actorUserId:user.id,action:"DEVELOPMENT_ROLE_ASSIGNED",resourceType:"User",resourceId:user.id,outcome:"SUCCESS",metadata:{role,method:"controlled-script"}}})]);
console.log("Development role assigned to an existing account.");await db.$disconnect();
