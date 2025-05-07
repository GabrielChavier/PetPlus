import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

// Esquema de validação com Yup
const validationSchema = Yup.object({
  fullName: Yup.string().required("O nome completo é obrigatório"),
  username: Yup.string().email("E-mail inválido").required("O e-mail é obrigatório"),
  password: Yup.string().min(6, "Mínimo de 6 caracteres").required("Senha obrigatória"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "As senhas não coincidem")
    .required("Confirmação obrigatória"),
  role: Yup.string().required("O tipo de usuário é obrigatório"),
});

const UserForm = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Se houver 'id', estamos editando

  const [initialValues, setInitialValues] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    role: "common", // Valor padrão do select
  });

  // Se estiver em modo de edição, busca dados do usuário e preenche o formulário
  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:3001/users/${id}`)
        .then((response) => {
          const user = response.data;
          setInitialValues({
            fullName: user.fullName || "",
            username: user.username || "",
            password: "", // Nunca preenchido por segurança
            confirmPassword: "",
            role: user.role || "common",
          });
        })
        .catch((error) => {
          console.error("Erro ao buscar usuário:", error);
        });
    }
  }, [id]);

  // Função que lida com o envio do formulário
  const handleSubmit = async (values, { setSubmitting }) => {
    const { fullName, username, password, role } = values;

    const userData = { fullName, username, password, role };

    try {
      if (id) {
        // Atualiza usuário existente
        await axios.put(`http://localhost:3001/users/${id}`, userData);
      } else {
        // Cria novo usuário
        await axios.post("http://localhost:3001/users", userData);
      }
      navigate("/users"); // Redireciona para a listagem de usuários
    } catch (error) {
      console.error("Erro ao salvar usuário:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">
        {id ? "Editar Usuário" : "Novo Usuário"}
      </h2>

      <Formik
        enableReinitialize // Permite atualizar o formulário ao carregar os dados de edição
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            {/* Campo: Nome Completo */}
            <div>
              <label htmlFor="fullName" className="block font-medium">Nome Completo</label>
              <Field name="fullName" type="text" className="w-full p-2 border rounded" />
              <ErrorMessage name="fullName" component="div" className="text-red-500 text-sm" />
            </div>

            {/* Campo: E-mail (username) */}
            <div>
              <label htmlFor="username" className="block font-medium">E-mail</label>
              <Field name="username" type="email" className="w-full p-2 border rounded" />
              <ErrorMessage name="username" component="div" className="text-red-500 text-sm" />
            </div>

            {/* Campo: Senha */}
            <div>
              <label htmlFor="password" className="block font-medium">Senha</label>
              <Field name="password" type="password" className="w-full p-2 border rounded" />
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
            </div>

            {/* Campo: Confirmar Senha */}
            <div>
              <label htmlFor="confirmPassword" className="block font-medium">Confirmar Senha</label>
              <Field name="confirmPassword" type="password" className="w-full p-2 border rounded" />
              <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />
            </div>

            {/* Campo: Tipo de usuário (role) */}
            <div>
              <label htmlFor="role" className="block font-medium">Tipo de Usuário</label>
              <Field as="select" name="role" className="w-full p-2 border rounded">
                <option value="common">Comum</option>
                <option value="admin">Admin</option>
                <option value="instituto">Instituto</option>
                <option value="desenvolvedor">Desenvolvedor</option>
              </Field>
              <ErrorMessage name="role" component="div" className="text-red-500 text-sm" />
            </div>

            {/* Botão de envio */}
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
              >
                {isSubmitting ? "Salvando..." : "Salvar"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UserForm;
