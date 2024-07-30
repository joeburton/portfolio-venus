"use client";

import axios from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";

import {
  validateEmail,
  validateMessage,
  validateName,
  validatePhoneNumber,
} from "./validation";

interface FormData {
  name: string;
  email: string;
  phoneNumber: string;
  message: string;
}

export const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phoneNumber: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormData>({
    name: "",
    email: "",
    phoneNumber: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    let error: string = "";

    switch (name) {
      case "name":
        error = validateName(value);
        break;
      case "email":
        error = validateEmail(value);
        break;
      case "phoneNumber":
        error = validatePhoneNumber(value);
        break;
      case "message":
        error = validateMessage(value);
        break;
      default:
        break;
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nameError = validateName(formData.name);
    const emailError = validateEmail(formData.email);
    const phoneNumberError = validatePhoneNumber(formData.phoneNumber);
    const messageError = validateMessage(formData.message);

    if (nameError || emailError || phoneNumberError || messageError) {
      setErrors({
        name: nameError,
        email: emailError,
        phoneNumber: phoneNumberError,
        message: messageError,
      });
      return;
    } else {
      try {
        setIsSubmitting(true);

        // delay
        await new Promise((r) => setTimeout(r, 2000));

        const data = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/mailsender`,
          formData,
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
            },
          }
        );

        // success
        if (data) {
          setIsSubmitting(false);
          window.location.href = "/thankyou";
        }
      } catch (error) {
        // show error
        setIsSubmitting(false);
        console.log("show error");
      }
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      phoneNumber: "",
      message: "",
    });
    setErrors({
      name: "",
      email: "",
      phoneNumber: "",
      message: "",
    });
  };

  if (!isClient) {
    return null;
  }

  return (
    <Box as='form' onSubmit={handleSubmit}>
      <FormControl id='name' mb={8} isInvalid={errors.name ? true : false}>
        <FormLabel mb={1} htmlFor='name' fontWeight='normal' color='#393934'>
          Name
        </FormLabel>
        <Input
          type='text'
          name='name'
          value={formData.name}
          onChange={handleChange}
          disabled={isSubmitting}
        />
        <FormErrorMessage position='absolute' m='4px 0 8px 0'>
          {errors.name}
        </FormErrorMessage>
      </FormControl>

      <FormControl id='email' mb={8} isInvalid={errors.email ? true : false}>
        <FormLabel mb={1} fontWeight='normal' color='#393934'>
          Email
        </FormLabel>
        <Input
          type='email'
          name='email'
          value={formData.email}
          onChange={handleChange}
          disabled={isSubmitting}
        />
        <FormErrorMessage position='absolute' m='4px 0 8px 0'>
          {errors.email}
        </FormErrorMessage>
      </FormControl>

      <FormControl
        id='phoneNumber'
        mb={8}
        isInvalid={errors.phoneNumber ? true : false}
      >
        <FormLabel mb={1} fontWeight='normal' color='#393934'>
          Phone Number
        </FormLabel>
        <Input
          type='tel'
          name='phoneNumber'
          value={formData.phoneNumber}
          onChange={handleChange}
          disabled={isSubmitting}
        />
        <FormErrorMessage position='absolute' m='4px 0 8px 0'>
          {errors.phoneNumber}
        </FormErrorMessage>
      </FormControl>

      <FormControl
        id='message'
        mb={4}
        isInvalid={errors.message ? true : false}
      >
        <FormLabel mb={1} fontWeight='normal' color='#393934'>
          Message
        </FormLabel>
        <Textarea
          name='message'
          value={formData.message}
          onChange={handleChange}
          minHeight='150px'
          disabled={isSubmitting}
        />
        <FormErrorMessage position='absolute' m='4px 0 8px 0'>
          {errors.message}
        </FormErrorMessage>
      </FormControl>

      <Button
        m='1rem 1rem 0 0'
        colorScheme='teal'
        type='submit'
        variant='outline'
        isLoading={isSubmitting}
      >
        Submit
      </Button>
      <Button
        mt='1rem'
        colorScheme='teal'
        type='reset'
        variant='outline'
        onClick={handleReset}
      >
        Reset
      </Button>
    </Box>
  );
};
