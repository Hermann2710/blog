import { Document, FilterQuery, Model } from "mongoose"

/**
 * Vérifie si une valeur est unique pour un champ donné dans un modèle Mongoose
 * @param model - Le modèle mongoose
 * @param field - Le nom du champ à vérifier
 * @param value - La valeur à vérifier
 * @param excludeId - (optionnel) Un ID à exclure (utile lors des mises à jour)
 * @returns Promise<boolean>
 */
export async function isUniqueField<T extends Document>(
  model: Model<T>,
  field: keyof T,
  value: any,
  excludeId?: string
): Promise<boolean> {
  const query: FilterQuery<T> = { [field]: value } as FilterQuery<T>

  if (excludeId) {
    query["_id"] = { $ne: excludeId }
  }

  const exists = await model.exists(query)

  return !exists // true si la valeur est unique
}
