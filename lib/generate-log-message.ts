import { ACTION, AuditLog } from '@prisma/client'

export const generateLogMessage = (log: AuditLog) => {
  const { action, entityTitle, entityType } = log

  switch (action) {
    case ACTION.CREATE:
      return ` criou este ${entityType.toLowerCase()} "${entityTitle}"`
    case ACTION.UPDATE:
      return ` atualizou este ${entityType.toLowerCase()} "${entityTitle}"`
    case ACTION.DELETE:
      return ` excluiu este ${entityType.toLowerCase()} "${entityTitle}"`
    default:
      return ` unknown action ${entityType.toLowerCase()} "${entityTitle}"`
  }
}
