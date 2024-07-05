import React from "react";
import { ChangeEvent } from "react";
import { Form, Input, Button, Row, Col, Select, Modal } from "antd";
import "./Form.css";
import { ESTADOS_MEXICO } from "../../utils/constants";

const AntForm: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    console.log("Valores del formulario:", values);

    // Construir el objeto JSON con la estructura requerida
    const formData = {
      infoUsuario: {
        Nombre: values.nombre,
        PrimerApellido: values.primerApellido,
        SegundoApellido: values.segundoApellido,
        CURP: values.curp,
        RFC: values.rfc,
      },
      Domicilio: {
        Calle: values.calle,
        NumeroExterior: values.numeroExterior,
        NumeroInterior: values.numeroInterior,
        Estado: values.estado,
        DelegacionMunicipio: values.delegacionMunicipio,
        Colonia: values.colonia,
        CodigoPostal: values.cp,
      },
    };

    // Enviar los datos al servicio httpbin.org/post
    try {
      const response = await fetch("http://httpbin.org/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error al enviar los datos del formulario");
      }

      // Mostrar mensaje de éxito
      Modal.success({
        title: "Formulario enviado correctamente",
        content: "Los datos del formulario han sido guardados exitosamente.",
      });

      // Capturar y manejar la respuesta del servidor
      const responseData = await response.json();
      console.log("Respuesta del servidor:", responseData);
    } catch (error) {
      console.error("Error al enviar los datos del formulario:", error);
      // Mostrar mensaje de error
      Modal.error({
        title: "Error al enviar el formulario",
        content:
          "Hubo un problema al intentar enviar los datos del formulario. Inténtalo de nuevo más tarde.",
      });
    }
  };

  const onFinishFailed = () => {
    Modal.error({
      title: "Existen campos por validar",
      content:
        "Por favor, completa todos los campos requeridos y corrige los errores.",
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const upperCaseValue = value.toUpperCase();
    form.setFieldsValue({ [name]: upperCaseValue });
  };

  return (
    <div className="form-container">
      <Form
        form={form}
        name="userInfo"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
        className="ant-form"
      >
        <h2 className="title-form">Formulario de registro</h2>
        <hr className="hr-title" />
        <Row gutter={12}>
          <Col span={8}>
            <Form.Item
              name="nombre"
              label="Nombre"
              rules={[
                { required: true, message: "Campo nombre vacio" },
                {
                  pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                  message: "El nombre solo debe contener letras",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="primerApellido"
              label="Primer Apellido"
              rules={[
                {
                  required: true,
                  message: "Campo primer apellido vacio",
                },
                {
                  pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                  message: "El nombre solo debe contener letras",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="segundoApellido"
              label="Segundo Apellido"
              rules={[
                {
                  required: true,
                  message: "Campo segundo apellido vacio",
                },
                {
                  pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                  message: "El nombre solo debe contener letras",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={12}>
          <Col span={12}>
            <Form.Item
              name="curp"
              label="CURP"
              rules={[
                {
                  required: true,
                  message: "Campo CURP vacío",
                },
                {
                  pattern:
                    /^[A-Z]{1}[AEIOU]{1}[A-Z]{2}[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[HM]{1}(AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)[B-DF-HJ-NP-TV-Z]{3}[0-9A-Z]{1}[0-9]{1}$/,
                  message: "El formato de la CURP no es válido",
                },
                {
                  max: 18,
                  message: "El CURP no puede tener más de 13 caracteres",
                },
              ]}
            >
              <Input name="curp" maxLength={18} onChange={handleChange} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="rfc"
              label="RFC (con homoclave)"
              rules={[
                {
                  required: true,
                  message: "Campo RFC vacío",
                },
                {
                  pattern:
                    /^[A-ZÑ&]{3,4}[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])[A-Z0-9]{3}$/,
                  message: "Formato de RFC inválido",
                },
                {
                  max: 13,
                  message: "El RFC no puede tener más de 13 caracteres",
                },
              ]}
            >
              <Input name="rfc" maxLength={13} onChange={handleChange} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={12}>
          <Col span={4}>
            <Form.Item
              name="cp"
              label="Codigo postal"
              rules={[
                {
                  required: true,
                  message: "Campo CP vacío",
                },
                {
                  pattern: /^[0-9]{5}$/,
                  message: "CP debe ser un número de 5 dígitos",
                },
                {
                  max: 5,
                  message: "CP debe ser menos a 5 caracteres",
                },
              ]}
            >
              <Input maxLength={5} />
            </Form.Item>
          </Col>

          <Col span={20}>
            <Form.Item
              name="calle"
              label="Calle"
              rules={[
                {
                  required: true,
                  message: "Campo calle vacio",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={12}>
          <Col span={6}>
            <Form.Item
              name="numeroExterior"
              label="Numero exterior"
              rules={[
                {
                  required: true,
                  message: "Campo Num. exterior vacio",
                },
                {
                  pattern: /^[0-9]{5}$/,
                  message: "Num.Ext debe ser un número de 5 dígitos",
                },
                {
                  max: 5,
                  message: "Num.Ext debe ser menos a 5 caracteres",
                },
              ]}
            >
              <Input maxLength={5} />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item
              name="numeroInterior"
              label="Numero interior"
              rules={[
                {
                  required: true,
                  message: "Campo Num. interior vacio",
                },
                {
                  pattern: /^[a-zA-Z0-9\s.#]{1,10}$/,
                  message:
                    "El Num.int debe ser alfanumérico y no mayor a 10 caracteres",
                },
                {
                  max: 10,
                  message: "El Num.int no puede tener más de 10 caracteres",
                },
              ]}
            >
              <Input maxLength={10} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="estado"
              label="Estado"
              rules={[
                {
                  required: true,
                  message: "Campo estado vacio",
                },
              ]}
            >
              <Select placeholder="Selecciona un estado">
                {ESTADOS_MEXICO.map((estado) => (
                  <Select.Option key={estado} value={estado}>
                    {estado}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={12}>
          <Col span={12}>
            <Form.Item
              name="delegacionMunicipio"
              label="Delegacion / Municipio"
              rules={[
                {
                  required: true,
                  message: "Campo Delegacion/Municipio vacio",
                },
                {
                  pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                  message: "El nombre solo debe contener letras",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="colonia"
              label="Colonia"
              rules={[
                {
                  required: true,
                  message: "Campo colonia vacio",
                },
                {
                  pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                  message: "El nombre solo debe contener letras",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="button-form">
            Enviar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AntForm;
