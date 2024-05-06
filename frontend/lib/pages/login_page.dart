import 'package:flutter/material.dart';

class LoginPage extends StatelessWidget {

  LoginPage({super.key});

  final emailFieldController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      body: Text("Login")
    );
  }
}