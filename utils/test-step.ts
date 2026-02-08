import { test } from '@playwright/test';

const formatMethodNameIntoStepDescription = (input: string) => {
  const words = input.replaceAll(/([A-Z])/g, ' $1').trim();
  const result = words.charAt(0).toUpperCase() + words.slice(1).toLowerCase();
  return result;
};

export const testStep = async <T>(
  title: string,
  body: () => T | Promise<T>,
): Promise<T> => test.step(title, body, { box: true });

export function TestStep<T extends (...args: any[]) => any>(
  target: T,
  context: ClassMethodDecoratorContext,
): T {
  return function replacementMethod(
    this: ThisParameterType<T>,
    ...args: Parameters<T>
  ): ReturnType<T> extends Promise<infer U> ? Promise<U> : Promise<ReturnType<T>> {
    const methodName = context.name as string;
    const description = formatMethodNameIntoStepDescription(methodName);
    return test.step(description, () => target.call(this, ...args), {
      box: true,
    }) as ReturnType<T> extends Promise<infer U> ? Promise<U> : Promise<ReturnType<T>>;
  } as T;
}

