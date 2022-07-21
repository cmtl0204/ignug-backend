import { MaxLength } from 'class-validator';

export function messageIsString() {
  return {
    message: 'La propiedad $property debe ser una cadena',
  };
}

export function messageMinLength() {
  return {
    message:
      'La propiedad $property debe ser mayor o igual a $constraint1 caracteres',
  };
}

export function messageIsNotEmpty() {
  return {
    message: 'La propiedad $property no debe estar vacío',
  };
}

export function messageMaxLength() {
  return {
    message:
      'La propiedad $property debe ser menor o igual a $constraint1 caracteres',
  };
}
