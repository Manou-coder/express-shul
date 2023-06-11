import { z } from 'zod'

const numberValidator = z
  .string()
  .min(1)
  .refine((value) => !isNaN(Number(value)), {
    message: 'the value must be a number',
  })

const elevationValidator = z.string().refine((value) => !isNaN(Number(value)), {
  message: 'the value must be a number',
})

export const zmanimSchema = z.object({
  date: z.string().nullish(),
  timeZoneId: z.string(),
  locationName: z.string().nullish(),
  latitude: numberValidator,
  longitude: numberValidator,
  elevation: elevationValidator.nullish(),
  complexZmanim: z.string().nullish(),
})

export type ValidatedZmanimData = z.infer<typeof zmanimSchema>
