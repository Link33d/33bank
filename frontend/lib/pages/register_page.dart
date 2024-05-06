import 'package:flutter/material.dart';

class RegisterPage extends StatelessWidget {

  RegisterPage({super.key});
  
  final emailFieldController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      body: Text("Register")
    );
  }
}