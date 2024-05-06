import 'package:flutter/material.dart';

class MyTextField extends StatelessWidget {

  final String hintText;
  final bool obscureText;
  final IconData icon;
  final String FieldName;
  final TextEditingController controller;

  const MyTextField({
    super.key,
    required this.FieldName,
    required this.hintText,
    required this.icon,
    required this.obscureText,
    required this.controller
  });

  @override
  Widget build(BuildContext context) {
    return TextField(
      controller: controller,
      obscureText: obscureText,
      decoration: InputDecoration(
        suffixIcon: Icon(
          icon,
          color: Colors.grey[800],
        ),
        label: Text(
          FieldName,
          style: TextStyle(
            fontWeight: FontWeight.bold,
            color: Colors.grey[800]
          ),
        ),
        /*enabledBorder: const OutlineInputBorder(
          borderSide: BorderSide(color: Colors.white)
        ),
        focusedBorder: OutlineInputBorder(
          borderSide: BorderSide(color: Colors.grey.shade400)
        ),
        fillColor: Colors.grey[200],
        filled: true,
        hintText: hintText,
        hintStyle: TextStyle(color: Colors.grey[500])*/
      ),
    );
  }
}