export type SignUpError =
    | {
          kind: 'email-already-registered';
          field: 'email';
          message: string;
      }
    | {
          kind: 'weak-password';
          field: 'form';
          message: string;
      }
    | {
          kind: 'unknown';
          field: 'form';
          message: string;
      };
